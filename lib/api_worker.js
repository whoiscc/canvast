export default class APIWorker {
    constructor(logger) {
        this.logger = logger;
        this.logger.debugLog('api worker ready');
    }
}