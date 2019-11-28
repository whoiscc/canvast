import { PanResponder } from 'react-native';

export default class CanvasTouch {
  constructor(logger) {
    this.logger = logger;
    this.canvas = null;
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        if (this.canvas) {
          this.canvas.panStart(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (this.canvas) {
          this.canvas.panMove(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (this.canvas) {
          this.canvas.panStop();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        if (this.canvas) {
          this.canvas.panStop();
        }
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  panHandlers() {
    return this._panResponder.panHandlers;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }
}