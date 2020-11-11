"use strict";
/*
    This class is a connector between cloudmersive-ocr-api to NodeJS app.
    source: https://api.cloudmersive.com/docs/ocr.asp
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getText = void 0;
const CloudmersiveOcrApiClient = require('cloudmersive-ocr-api-client');
const fs = require("fs");
const defaultClient = CloudmersiveOcrApiClient.ApiClient.instance;
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '4bc9ddf6-b7f3-4928-9730-049e9bc9bf8b';
const apiInstance = new CloudmersiveOcrApiClient.ImageOcrApi();
exports.getText = (img) => {
    return new Promise((resolve, reject) => {
        const imageFile = Buffer.from(fs.readFileSync(img).buffer); // File | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
        const opts = {
            'recognitionMode': "Advanced",
            'language': "ENG",
            'preprocessing': "Auto" // String | Optional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended).
        };
        const callback = (error, data, response) => {
            if (error)
                reject(error);
            resolve(data);
        };
        apiInstance.imageOcrPost(imageFile, opts, callback);
    });
};
//# sourceMappingURL=TextDetectorApi.js.map