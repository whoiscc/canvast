import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, StatusBar } from 'react-native';
import RNCanvas from 'react-native-canvas';
import PaintManager from './lib/paint_manager';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.logger}>{this.state.logText}</Text>
        <Canvas logHandler={this._logHandler} />
      </View>
    );
  }

  state = {
    logText: 'initial log',
  }

  _logHandler = (logText) => {
    this.setState(() => ({logText}));
  } 
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.paintManager = new PaintManager(logText => this.debugLog(logText));
  }

  debugLog(logText) {
    this.props.logHandler(logText);
  }

  render() {
    return (
      <View 
        {...this.paintManager.panHandlers()} 
        style={styles.canvas}
        onLayout={this.onLayoutHandler}
      >
        <RNCanvas ref={this.paintManager.canvasHandler} style={styles.canvasInner} />
      </View>
    );
  }

  onLayoutHandler = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.paintManager.resizeCanvas(width, height);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logger: {
    position: 'absolute',
    color: 'blue',
  },
  canvas: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10
  },
  canvasInner: {
    width: 800,
    height: 600,
  },
});


