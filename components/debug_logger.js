import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class DebugLogger extends Component {
    state = {
        logList: [],
    }

    logHandler(inplace, level, text) {
        const log = { level, text };
        this.setState(({ logList }) => {
            if (inplace) {
                logList[0] = log;
            } else {
                logList.unshift(log);
                if (logList.length > 5) {
                    logList.pop();
                }
            }
            return { logList };
        })
    }

    componentDidMount() {
        this.props.mountHandler({
            update: text => this.logHandler(true, 'debug', text),
            debug: text => this.logHandler(false, 'debug', text),
            error: text => this.logHandler(false, 'error', text),
        });
    }

    componentWillUnmount() {
        this.props.unmountHandler();
    }

    render() {
        const renderedLogList = this.state.logList.map(({ text, level }, index) => (
            <Text style={[styles.logText, level === 'error' ? styles.error : {}]} key={index}>{text}</Text>
        ));
        return (
            <View style={styles.container}>{renderedLogList}</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    logText: {
        color: 'gray',
    },
    error: {
        color: 'red',
    },
});