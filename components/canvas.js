import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNCanvas from 'react-native-canvas';

export default class Canvas extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCanvas />
            </View>
        );
    }

    componentDidMount() {
        this.props.logger.debugLog('canvas ready');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
});