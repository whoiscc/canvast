import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import Canvas from './canvas';
import APIWorker from '../lib/api_worker';
import CanvasManager from '../lib/canvas';
import CanvasTouch from '../lib/canvas_touch';
import Button from './button';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.apiWorker = new APIWorker(this.props.logger);
        this.canvas = null;
        this.canvasTouch = new CanvasTouch(this.props.logger);
    }

    state = {
        color: [9, 100, 64, 0.5],
        pos: [0, 0],
        buttonVisible: true,
    }

    render() {
        const [h, s, l, a] = this.state.color;
        const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;

        const buttonView = this.state.buttonVisible ? (
            <View style={styles.buttonContainer}>
                <Button
                    size={60}
                    onPress={() => this.props.logger.debugLog('pressed')}
                    style={{ backgroundColor: color }}
                ></Button>
                <Button
                    size={60}
                    onPress={() => { }}
                    style={{ justifyContent: 'center' }}
                >
                    <Text
                        adjustsFontSizeToFit={true}
                        style={{ textAlign: 'center' }}
                    >{Math.floor(this.state.pos[0])}</Text>
                    <Text
                        adjustsFontSizeToFit={true}
                        style={{ textAlign: 'center' }}
                    >{Math.floor(this.state.pos[1])}</Text>
                </Button>
            </View>
        ) : null;

        return (
            <View style={{flex: 1}}>
                <Canvas
                    logger={this.props.logger} touch={this.canvasTouch}
                    nativeCanvasHandler={this.nativeCanvasHandler}
                />
                {buttonView}
            </View>
        );
    }

    componentDidMount() {
        this.apiWorker.test();
    }

    disableButton = () => {
        this.props.logger.debugLog('disable button');
        this.setState({ buttonVisible: false });
    }

    enableButton = () => {
        this.setState({ buttonVisible: true });
    }

    nativeCanvasHandler = (canvas) => {
        this.canvas = new CanvasManager(this.apiWorker, this, canvas, [0, 0], this.props.logger);
        this.canvasTouch.setCanvas(this.canvas);
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
});