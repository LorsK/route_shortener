"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
const ShortUrl = mongoose_1.default.model('ShortUrl', shortUrlsSchema, 'ShortUrl');
exports.default = ShortUrl;
