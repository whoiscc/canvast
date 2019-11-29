import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
                <View style={{
                    position: 'absolute',
                    left: this.props.offset[0],
                    top: this.props.offset[1],
                }}>
                    <RNCanvas ref={this.nativeCanvasHandler} />
                    {/* {this.props.imageSrc ? <Image
                        style={[StyleSheet.absoluteFill, { borderWidth: 3 }]}
                        source={{ uri: this.props.imageSrc }}
                        // width={300} height={300}
                        resizeMode="stretch"
                    /> : null} */}
                </View>
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