/*
    This class is an implementaion to IKMProcessor.
    This implementaion use a python script for the red rectangle detaction.
    This class usings TextDetection API for getting text from an image.

    *private img : Buffer | undefined- the whole image from the eml.
    *private readonly IMGNAME = 'Images/image.jpg' - the path to the image.
    *private readonly PY_SCRIPT = the path to the python script.
    *private readonly CONFIDENCE = 0.90 - confidence constant for text detection.
    *setImg - A setter for image.
    *saveImgAsync - Save the image in the disk.
    *getOutputFromPyScriptAsync- This function return the output from the pyscript
    using promise. The function use PythonShell lib for message passing between NodeJS
    process and python process.
    public async getKMAsync():Promise<string>{
    *getKMAsync- This function using the cropped image (as a result from python script execution)
    for text detection by using Cloudmersive API. If did succeed returns the text, else
    throws new CannotDetectKmError().
*/


import {getText} from './TextDetectorApi'
import ImageFileIsNull from "./Errors/ImageFileIsNullError";
import { FileHandler } from "./FileHandler";
import { IKMProcessor } from "./IKMProcessor";
import CannotDetectKmError from './Errors/CannotDetectKmError';
import { PythonShellError } from 'python-shell';


export class KMProcessor implements IKMProcessor{
    private img : Buffer | undefined;
    private readonly IMGNAME = 'Images/image.jpg';
    private readonly PY_SCRIPT = 'C:/Users/ofekr/OneDrive/Documents/Vehicle-Tracking-System-Exercise/srcJS/SrcPy/RectangleDetector/venv/Lib/site-packages/main.py';
    private readonly CONFIDENCE = 0.90;

    constructor(){
        this.img = undefined;


    }

    private validImg(){
        if(this.img === undefined)
            throw new ImageFileIsNull();
    }

    public setImg(img:Buffer){
        if(img === undefined)
            throw new ImageFileIsNull();
        this.img = img;
    }

    public async saveImgAsync(){
        this.validImg();
        return FileHandler.saveImage(this.IMGNAME, this.img as Buffer);
    }

    private getOutputFromPyScriptAsync():Promise<string>{
        const {PythonShell} = require('python-shell');
        return new Promise((resolve, reject) =>{
            const pyShell = new PythonShell(this.PY_SCRIPT);
            pyShell.on('message', (msg:string)=>resolve(msg));
            pyShell.end((err:string)=>{
                if(err)
                    reject(new PythonShellError(err));
                resolve('');
            });
    })};

    public async getKMAsync():Promise<string>{
       const results =  await this.getOutputFromPyScriptAsync();
       let files:string[] = [];
       results.split(',').filter(x=>x!='').forEach((fName:string)=>files.push(fName));
       
       for(let i=0; i<files.length;i++){
           const file = files[i];
           const textObj = await getText(file);
            const {MeanConfidenceLevel,TextResult} = textObj;

            if(MeanConfidenceLevel >= this.CONFIDENCE && TextResult !== '' && this.hasNumber(TextResult)){
                return TextResult.replace(/\n/g, ' ');
            }
       }
       throw new CannotDetectKmError(); 
    }

    public getImgPath(){
        return this.IMGNAME;
    }

    private hasNumber(str:string) {
        return /\d/.test(str);
      }
    
}