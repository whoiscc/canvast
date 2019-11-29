import rgbToString from './rgb_to_string';
import { Image } from 'react-native-canvas';

export default class CanvasWorker {
    constructor(canvas, color, logger) {
        this.context = canvas.getContext('2d');
        this.strokeStyle = rgbToString(color);
        this.logger = logger;
        this.canvas = canvas;
    }

    size() {
        return [this.canvas.width, this.canvas.height];
    }

    updateColor(color) {
        this.strokeStyle = rgbToString(color);
    }

    moveTo([x, y]) {
        this.context.beginPath();
        this.context.strokeStyle = this.strokeStyle;
        this.context.moveTo(x, y);
    }

    lineTo([x, y]) {
        this.context.lineTo(x, y);
        this.context.lineWidth = 3;
        this.context.stroke();
    }

    toImage() {
        return this.canvas.toDataURL('image/png');
    }

    patchImage(src, [dx, dy], then) {
        const image = new Image(this.canvas);
        image.src = src;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        image.addEventListener('load', () => {
            // this.logger.debugLog('dx ' + dx + ' dy ' + dy);
            // this.logger.debugLog('size ' + image.width + ', ' + image.height);
            this.context.drawImage(image, dx, dy, this.canvas.width, this.canvas.height);
        });
        then();
    }
}