import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNCanvas from 'react-native-canvas';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvas = null;
    }

    render() {
        return (
            <View
                {...this.props.touch.panHandlers()}
                style={styles.container} onLayout={this.layoutHandler}>
                <RNCanvas ref={this.nativeCanvasHandler} />
            </View>
        );
    }

    componentDidMount() {
        this.props.logger.debugLog('canvas ready');
    }

    layoutHandler = (event) => {
        if (this.canvas) {
            const { width, height } = event.nativeEvent.layout;
            this.canvas.width = width;
            this.canvas.height = height;
            this.props.logger.debugLog('[layout] resize canvas ' + width + ' * ' + height);
        }
    }

    nativeCanvasHandler = (canvas) => {
        this.canvas = canvas;
        this.props.nativeCanvasHandler(canvas);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
});