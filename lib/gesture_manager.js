export default class GestureManager {
    constructor(canvas) {
        this.mode = null;
        this.canvas = canvas;
        this.timer = null;
        this.moveAngle = null;
        this.paintLongPress = false;
        this.paintStart = null;
        this.panCount = 0;
    }

    panStart([x, y]) {
        const [width, height] = this.canvas.size();
        if (x < 50 || y < 50 || x > width - 50 || y > height - 50) {
            this.mode = 'move';
            this.canvas.moveStart();
            this.updateMoveAngle(x, y);
            this.timer = setInterval(() => {
                this.canvas.move(this.moveAngle);
            }, 10);
        } else {
            this.mode = 'paint';
            const panCount = this.panCount;
            this.paintLongPress = true;
            this.paintStart = [x, y];
            const timer = setTimeout(() => {
                clearTimeout(timer);
                if (panCount == this.panCount && this.paintLongPress) {
                    this.canvas.uploadImage([x, y]);
                }
            }, 700);
        }
    }

    panMove([x, y]) {
        if (this.mode === 'move') {
            this.updateMoveAngle(x, y);
        } else {
            const [startX, startY] = this.paintStart;
            if (startX != x || startY != y) {
                if (this.paintLongPress) {
                    this.canvas.lineStart([x, y]);
                }
                this.paintLongPress = false;
            }
            if (!this.paintLongPress) {
                this.canvas.lineTo([x, y]);
            }
        }
    }

    panStop() {
        if (this.mode === 'move') {
            clearInterval(this.timer);
            this.timer = null;
            this.moveAngel = null;
            this.canvas.moveEnd();
        } else {
            this.paintStart = null;
            if (this.paintLongPress) {
                this.paintLongPress = false;
            } else {
                this.canvas.lineEnd();
            }
        }
        this.mode = null;
        this.panCount += 1;
    }

    updateMoveAngle(x, y) {
        const [width, height] = this.canvas.size();
        const centerX = width / 2, centerY = height / 2;
        const dx = x - centerX, dy = y - centerY;
        const h = Math.hypot(dx, dy);
        const sin = dy / h, cos = dx / h;
        this.moveAngle = [-cos, -sin];
    }
}