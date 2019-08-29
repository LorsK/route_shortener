// import { Logger } from '../utils/logger.util';
import ShortUrl from './model';
import jsonfile from 'jsonfile';

export class Service {
    // private logger: Logger = new Logger('shortUrl-service');

    generateShortUrl = async(link: any): Promise<{ status: number, json: any }> => {
    
        let shortUrl;
        if (this.isEmpty(link)) {
            return { status: 400, json: { msg: 'Invalid Request', data: {}} };
        }
        // Create a shorturl object
        // shortUrl = new ShortUrl({
        //     url: link,
        // });
        shortUrl = {
            url: link
        };

        const response = await this.createAndSaveShortUrl(shortUrl);
        return response;
    }

    private createAndSaveShortUrl = async (shortUlrObj): Promise<{ status: number, json: any }>  => {
        // Generate a random string to replace the url
        let randomStr = this.generateRandomString();
        // Check if the random string already exist in DB 
        // let result = await ShortUrl.findOne({ urlCode: randomStr });

        const file = '/tmp/data.json'
        // jsonfile.writeFileSync(file, shortUlrObj, { flag: 'a' })

        // while (!this.isEmpty(result)) {
        //     randomStr = this.generateRandomString();
        //     result = await ShortUrl.findOne({ urlCode: randomStr });
        // }
        let data = await jsonfile.readFileSync(file)
        // TODO: check if random string or link already exists

        data[randomStr] = shortUlrObj
    
        await jsonfile.writeFileSync(file, data);
        // shortUlrObj.urlCode = randomStr;
        // Not a duplicate
        // shortUlrObj.save(err => {
        //     if (err) {
        //         return { status: 400, json: { success: false, msg: err, data: shortUlrObj } };
        //     }
        // });
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
