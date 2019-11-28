export default class CanvasManager {

    BLOCK_SIZE = 16;

    constructor(api, canvas, pos, logger) {
        this.api = api;
        this.canvas = canvas;
        this.pos = pos;
        this.color = [0, 0, 0, 0];
        this.blockMap = {};
        // this.reload();
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
}