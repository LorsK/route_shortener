import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//Create Schema
const shortUrlsSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    urlCode: {
        type: String,
    },
    hits: {
        default: 0,
        type: Number,
    },
    createdDate: {
        default: Date.now,
        type: Date,
    }
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlsSchema, 'ShortUrl');

export default ShortUrl;
