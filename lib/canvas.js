import CanvasWorker from './canvas_worker';
import GestureManager from './gesture_manager';

export default class CanvasManager {

    BLOCK_SIZE = 16;

    constructor(api, ui, canvas, pos, color, logger) {
        this.api = api;
        this.ui = ui;
        this.color = color;
        this.pos = pos;
        this.blockMap = {};
        this.logger = logger;
        this.canvas = new CanvasWorker(canvas, this.color, logger);
        this.gesture = new GestureManager(this);
        this.canvasCache = null;
        this.accMove = null;
    }

    screenOffset([x, y]) {
        const [width, height] = this.canvas.size();
        const centerX = width / 2, centerY = height / 2;
        const [posX, posY] = this.pos;
        return [x - posX + centerX, y - posY + centerY];
    }

    blockScreenOffset([blockX, blockY]) {
        return this.screenOffset([blockX * this.BLOCK_SIZE, blockY * this.BLOCK_SIZE]);
    }

    canvasOffset([x, y]) {
        const [width, height] = this.canvas.size();
        const centerX = width / 2, centerY = height / 2;
        const [posX, posY] = this.pos;
        return [x - centerX + posX, y - centerY + posY];
    }

    calculateVisible() {
        return [[this.canvasOffset([0, 0])], [this.canvasOffset(this.canvas.size())]]
    }

    refresh() {
        const region = this.calculateVisible();
        let lastUpdate = null;
        for (key of iterateBlockKey(region, this.BLOCK_SIZE)) {
            if (this.blockMap[key]) {
                if (!lastUpdate || this.blockMap[key].updateAt > lastUpdate) {
                    lastUpdate = this.blockMap[key].updateAt;
                }
            }
        }
        this.api.queryRegion(region, lastUpdate)
            .then(blocks => {
                for (const [key, block] of blocks) {
                    this.blockMap[key] = block;
                    this.canvas.patchImage(this.calculateBlockOffset(key), block.image);
                }
                this.cleanUpInvisible();
            });
    }

    size() {
        return this.canvas.size();
    }

    cleanUpInvisible() {
        const insivisbleKeys = [];
        for ([key, block] of Object.entries(this.blockMap)) {
            const parts = key.split(',');
            const [blockX, blockY] = [parseInt(parts[0]), parseInt(parts[1])];
            const x = blockX * this.BLOCK_SIZE, y = blockY * this.BLOCK_SIZE;
            const [[lowX, lowY], [highX, highY]] = this.calculateVisible();
            if ((x + this.BLOCK_SIZE) < lowX || x > highX || (y + this.BLOCK_SIZE) < lowY || y > highY) {
                invisibleKeys.push(key);
            }
        }
        for (key of insivisbleKeys) {
            delete this.blockMap[key];
        }
    }

    panStart(x, y) {
        // this.logger.debugLog('pan start at ' + x + ', ' + y);
        // this.logger.debugLog('waiting for move...');
        this.ui.disableButton();
        this.gesture.panStart([x, y]);
    }

    panMove(x, y) {
        // this.logger.updateLog('pan move to ' + x + ', ' + y);
        this.gesture.panMove([x, y]);
    }

    panStop() {
        // this.logger.debugLog('pan stop');
        this.gesture.panStop();
        this.ui.enableButton();
    }

    setColor(color) {
        this.color = color;
        this.logger.debugLog('set color to ' + color);
        this.canvas.updateColor(color);
    }

    setPos(pos) {
        this.pos = pos;
        this.logger.debugLog('set pos to ' + pos);
    }

    uploadImage([x, y]) {
        this.logger.debugLog('upload image at ' + [x, y]);
    }

    moveStart() {
        this.canvasCache = this.canvas.toImage();
        // this.logger.debugLog(this.canvasCache.toString());
        this.accMove = [0, 0];
    }

    moveEnd() {
        this.canvasCache.then(data => {
            // this.ui.updateImage(data.substring(1).slice(0, -1));
            this.canvas.patchImage(data.substring(1).slice(0, -1), this.accMove, () => {
                this.logger.debugLog('patch finish');
                this.ui.resetCanvas();
            });
            this.ui.resetCanvas();
            this.canvasCache = null;
            this.accMove = null;
        });
    }

    move([dx, dy]) {
        // this.logger.updateLog('move delta ' + [dx, dy]);
        const [x, y] = this.pos;
        this.pos = [x + dx, y + dy];
        this.ui.updatePos([Math.floor(x), Math.floor(y)]);
        this.accMove = [this.accMove[0] + dx, this.accMove[1] + dy];
        // this.canvas.patchImage(this.accMove, this.canvasCache, true);
        this.ui.moveCanvas([dx, dy]);
    }

    lineStart([x, y]) {
        this.logger.debugLog('line start at ' + [x, y]);
        this.canvas.moveTo([x, y]);
    }

    lineTo([x, y]) {
        this.logger.updateLog('line to ' + [x, y]);
        this.canvas.lineTo([x, y]);
    }

    lineEnd() {
        this.logger.debugLog('line end');
    }
}