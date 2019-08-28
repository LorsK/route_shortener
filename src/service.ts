// import { Logger } from '../utils/logger.util';
import ShortUrl from './model';

export class Service {
    // private logger: Logger = new Logger('shortUrl-service');

    public generateShortUrl = async(link: any): Promise<{ status: number, json: any }> => {]
    
        let shortUrl;
        if (this.isEmpty(link)) {
            return { status: 400, json: { msg: 'Invalid Request', data: {}} };
        }
        // Create a shorturl object
        shortUrl = new ShortUrl({
            url: link,
        });
        const response = await this.createAndSaveShortUrl(shortUrl);
        return response;
    }

    private createAndSaveShortUrl = async (shortUlrObj): Promise<{ status: number, json: any }>  => {
        // Generate a random string to replace the url
        let randomStr = this.generateRandomString();
        // Check if the random string already exist in DB 
        let result = await ShortUrl.findOne({ urlCode: randomStr });

        while (!this.isEmpty(result)) {
            randomStr = this.generateRandomString();
            result = await ShortUrl.findOne({ urlCode: randomStr });
        }

        shortUlrObj.urlCode = randomStr;
        // Not a duplicate
        shortUlrObj.save(err => {
            if (err) {
                return { status: 400, json: { success: false, msg: err, data: shortUlrObj } };
            }
        });
        return { status: 200, json: { success: true,  data: `/${randomStr}`} };

    }

    private generateRandomString = () => {
        const length = 6;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let retVal = '';
        for (let i = 0, n = charset.length; i < length; i = i + 1) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    private isEmpty = (obj) => {
        if (obj == null) return true;
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

}
