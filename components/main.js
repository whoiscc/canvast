import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import DebugLogger from './debug_logger';
import Canvas from './canvas';
import APIWorker from '../lib/api_worker';
import CanvasManager from '../lib/canvas';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.debugLoggerHandlers = null;
        this.apiWorker = new APIWorker(this);
        this.canvas = null;
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <DebugLogger
                    mountHandler={this.debugLoggerMountHandler}
                    unmountHandler={this.debugLoggerUnmountHandler}
                />
                <Canvas 
                    logger={this} 
                    nativeCanvasHandler={this.nativeCanvasHandler}
                />
            </View>
        )
    }

    debugLoggerMountHandler = debugLoggerHandlers => {
        this.debugLoggerHandlers = debugLoggerHandlers;
    }

    debugLoggerUnmountHandler = () => {
        this.debugLoggerHandlers = null;
    }

    nativeCanvasHandler = (canvas) => {
        this.canvas = new CanvasManager(this.apiWorker, canvas, [0, 0], this);
    }

    updateLog(text) {
        if (this.debugLoggerHandlers) {
            this.debugLoggerHandlers.update(text);
        }
    }

    debugLog(text) {
        if (this.debugLoggerHandlers) {
            this.debugLoggerHandlers.debug(text);
        }
    }

    errorLog(text) {
        if (this.debugLoggerHandlers) {
            this.debugLoggerHandlers.error(text);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})