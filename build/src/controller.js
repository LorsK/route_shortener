"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
class ShortUrlController {
    // private logger: Logger;
    constructor() {
        this.generateShortUrl = async (req, res, next) => {
            // this.logger.info('Received Generate Share URL Request', req.url);
            const result = await this._service.generateShortUrl(req.body);
            res.status(result.status).send(result.json);
        };
        this.redirectUrl = async (req, res, next) => {
            // this.logger.info('Received Redirect Url Request', req.url);
            const { status, json } = await this._service.generateShortUrl(req.body);
            res.status(status).send(json);
        };
        this._service = new service_1.Service();
        // this.logger = new Logger('shortUrl-controller');
    }
}
exports.ShortUrlController = ShortUrlController;
