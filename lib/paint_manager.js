import { PanResponder } from 'react-native';

export default class PaintManager {
  constructor(logHandler) {
    this._logHandler = logHandler;
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
        this.startPaint(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        this.keepPaint(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.stopPaint();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.stopPaint();
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

  debugLog(logText) {
    this._logHandler(logText);
  }

  canvasHandler = (canvas) => {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._context.lineWidth = 0.2;
  }

  startPaint(x, y) {
    this.debugLog(`start at (${x}, ${y})`);
    this._context.moveTo(x, y);
  }

  keepPaint(x, y) {
    this.debugLog(`keep at (${x}, ${y})`);
    this._context.lineTo(x, y);
    this._context.stroke();
    
  }

  stopPaint() {
    this.debugLog('stop');
  }

  resizeCanvas(width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
    this.debugLog(`canvas size: (${width}, ${height})`);
  }
}