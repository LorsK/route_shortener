import express from 'express';
import { Service } from './service';

export class ShortUrlController {
    private _service: Service;

    // private logger: Logger;

    constructor() {
        this._service = new Service();
        // this.logger = new Logger('shortUrl-controller');
    }


    public generateShortUrl = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this.logger.info('Received Generate Share URL Request', req.url);

        const result = await this._service.generateShortUrl(req.body);
        res.status(result.status).send(result.json);
    }

    public redirectUrl = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this.logger.info('Received Redirect Url Request', req.url);

        const { status, json } = await this._service.generateShortUrl(req.body);
        res.status(status).send(json);
    }
}
