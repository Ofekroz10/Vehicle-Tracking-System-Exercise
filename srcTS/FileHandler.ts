/*
    A module for handeling files.
    * isExist() - Return true if the filePath exists.
    *createReadStream = (path:string) - Return read stream from this file.
    * saveImage(name,buf)= Gets the binary image as buffer, and save it into the disk.
    * writeToLogFile = async (fName:string,obj: ILogable)- Gets logable object and save the object
    to a file.
*/

import {ILogable } from "./ILogable";

const fs = require("fs");
const fsPromises = require("fs").promises;

export module FileHandler{
    export const isExist = (filePath:string)=> fs.existsSync(filePath);
    
    export const createReadStream = (path:string)=> fs.createReadStream(path);

    export const saveImage = async (name:string,img:Buffer)=> {
        //@ts-ignore
        const buf = Buffer.from(img, 'base64');
        await fsPromises.writeFile(name,buf);
    }

    export const writeToLogFile = async (fName:string,obj: ILogable)=>{
        await fsPromises.writeFile(fName,obj.toLog());
    }
}