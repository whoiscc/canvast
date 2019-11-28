import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Canvas from './canvas';
import APIWorker from '../lib/api_worker';
import CanvasManager from '../lib/canvas';
import CanvasTouch from '../lib/canvas_touch';
import ButtonContainer from './button_container';
import ColorPicker from './color_picker';
import PosSetter from './pos_setter';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.apiWorker = new APIWorker(this.props.logger);
        this.canvas = null;
        this.canvasTouch = new CanvasTouch(this.props.logger);
    }

    state = {
        color: [240, 150, 190, 1.0],
        currentColor: [240, 150, 190, 1.0],
        pos: [0, 0],
        buttonVisible: true,
        colorPickerVisible: false,
        posSetterVisible: false,
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ColorPicker
                    visible={this.state.colorPickerVisible}
                    onCloseHandler={() => {
                        this.setState(state => ({
                            colorPickerVisible: false,
                            color: state.currentColor,
                        }));
                        this.canvas.setColor(this.state.currentColor);
                    }}
                    color={this.state.color}
                    updateColor={(color) => this.setState({ currentColor: color })}
                />
                <PosSetter
                    visible={this.state.posSetterVisible}
                    setPos={(pos) => {
                        this.setState({
                            pos,
                            posSetterVisible: false,
                        });
                        this.canvas.setPos(pos);
                    }}
                    cancel={() => {
                        this.setState({ posSetterVisible: false });
                    }}
                />
                <Canvas
                    logger={this.props.logger} touch={this.canvasTouch}
                    nativeCanvasHandler={this.nativeCanvasHandler}
                />
                <ButtonContainer
                    pickColorHandler={() => this.setState({ colorPickerVisible: true })}
                    setPosHandler={() => this.setState({ posSetterVisible: true })}
                    color={this.state.currentColor}
                    pos={this.state.pos}
                />
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
        this.canvas = new CanvasManager(this.apiWorker, this, canvas, this.state.pos, this.props.logger);
        this.canvasTouch.setCanvas(this.canvas);
    }
}
