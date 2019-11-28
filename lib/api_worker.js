

var address = 'correctizer.net:8088'


export default class APIWorker {




    constructor(logger) {
        this.logger = logger;
        this.logger.debugLog('api worker ready');
    }

    loginMaintain(username, password){

    }

    test() {
        this.logger.debugLog('api worker start test');
    }

}