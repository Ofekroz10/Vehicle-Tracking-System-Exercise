/*
    This class an implementaion of IQRProcessor.
    *private img:Buffer | undefined - the image buffer from the eml file.
    *getPayloadAsync - return the payload from the QR. Using jsqr lib.

*/

import ImageFileIsNull from "./Errors/ImageFileIsNullError";
import QRError from "./Errors/QRError";
import { IQRProcessor } from "./IQRProcessor";


export class QRProcessor implements IQRProcessor{
    private img:Buffer | undefined;

    constructor(){
        this.img = undefined;
    }

    public setImg(img:Buffer){
        if(!img)
            throw new ImageFileIsNull();
        this.img = img;
    }

    public async getPayloadAsync(){
        this.validImg();
        const jpeg = require('jpeg-js');
        const data = jpeg.decode(this.img);

        const out = {
            data: new Uint8ClampedArray(data.data),
            height: data.height,
            width: data.width,
          };
        
        const payload = await this.asyncQR(out);
        if(payload === null)
            throw new QRError();

        return payload.data;
    }

    private asyncQR(out:{data:Uint8ClampedArray, height:number, width:number}):Promise<any>{
        const jsQR = require("jsqr");
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(jsQR(out.data, out.width, out.height)),0);
        });
    }

    private validImg(){
        if(!this.img)
            throw new ImageFileIsNull();
    }
}