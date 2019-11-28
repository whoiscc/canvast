export default class CanvasManager {

    BLOCK_SIZE = 16;

    constructor(api, ui, canvas, pos, logger) {
        this.api = api;
        this.ui = ui;
        this.canvas = canvas;
        this.pos = pos;
        this.color = [0, 0, 0, 0];
        this.blockMap = {};
        this.logger = logger;
        // this.reload();
    }

    panHandlers() {
        return this.touch.panHandlers();
    }

    reload() {
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
                for ([key, block] of Object.entries(blocks)) {
                    this.blockMap[key] = block;
                }
                this.cleanUpInvisible();
                this.render();
            });
    }

    render() {
        //
    }

    panStart(x, y) {
        this.logger.debugLog('pan start at ' + x + ', ' + y);
        this.logger.debugLog('waiting for move...');
        this.ui.disableButton();
    }

    panMove(x, y) {
        this.logger.updateLog('pan move to ' + x + ', ' + y);
    }

    panStop() {
        this.logger.debugLog('pan stop');
        this.ui.enableButton();
    }

    setColor(color) {
        this.color = color;
        this.logger.debugLog('set color to ' + color);
    }

    setPos(pos) {
        this.pos = pos;
        this.logger.debugLog('set pos to ' + pos);
    }
}