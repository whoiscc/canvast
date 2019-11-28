import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import MainView from './components/main';
import DebugLogger from './components/debug_logger';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.debugLoggerHandlers = null;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <DebugLogger
                    mountHandler={this.debugLoggerMountHandler}
                    unmountHandler={this.debugLoggerUnmountHandler}
                />
                <MainView logger={this} />
            </View>
        );
    }

    debugLoggerMountHandler = debugLoggerHandlers => {
        this.debugLoggerHandlers = debugLoggerHandlers;
    }

    debugLoggerUnmountHandler = () => {
        this.debugLoggerHandlers = null;
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
