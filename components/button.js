import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {
    render() {
        const style = {
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2,
        };

        return (
            <TouchableOpacity
                style={[style, styles.button, this.props.style]}
                onPress={this.props.onPress}
            >{this.props.children}</TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        margin: 5,
    }
})