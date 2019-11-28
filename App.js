import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, StatusBar } from 'react-native';
import RNCanvas from 'react-native-canvas';
import PaintManager from './lib/paint_manager';
import MainView from './components/main';

export default class App extends Component {
  render() {
    return (
      <MainView />
    );
  }
}
