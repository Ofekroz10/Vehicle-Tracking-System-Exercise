import { IEmailProcessor } from "./IEmailProcessor";
import FileDontExistError from "./Errors/FileDontExistError"
import EmailFileIsNull from "./Errors/EmailFileIsNullError"
import CannotDetectGpsError from "./Errors/CannotDetectGpsError"
import {FileHandler} from "./FileHandler"

/*
    This class represents an implementation for IEmailProcessor.

    * this.emlPath - the path to the eml file we want to process.
    * setEmailFile(path :string)- a setter for emlPath, if target file 
    dont exist throw new FileDontExistError. 
    * getEmployeeIDAsync():Promise<string> - An async function for extract the employee's
    id from the eml file.
    * getAattachedImageAsync():Promise<Buffer> - Return the attached image from the eml file.
    assuming: there is only one attached file(the image of the dashboard).
    * getLocationAsync():Promise<[number,number]> - Return the location of the vehicle
    as this form: [longetude,latitude].
    * onMailParser(func : (mailObj:any) => Buffer|String) - Gets a fuction for executing when mail
    was parsed. (convert the callback design to promise)

*/


export class EmailProcessor implements IEmailProcessor{
    private emlPath : string;
    
    constructor(){
        this.emlPath = "";
    }

    public setEmailFile(path :string){
        if(!FileHandler.isExist(path))
            throw new FileDontExistError();
        this.emlPath = path;   
    }

    public getEmployeeIDAsync():Promise<string>{
       const getFrom = (mailObj:{from:[{address:string}]})=> mailObj.from[0].address;
       return this.onMailParser(getFrom) as Promise<string>;
    }

    public getAattachedImageAsync():Promise<Buffer>{
        const getAttachedImage = (mailObj:{attachments:[{content:Buffer}]})=> {
            const file = mailObj.attachments[0].content;
            return file;
        }
        return this.onMailParser(getAttachedImage) as Promise<Buffer>;
    }

    public async getLocationAsync():Promise<[number,number]>{
        const fileBuffer = await this.getAattachedImageAsync();
        const parser = require('exif-parser').create(fileBuffer);
        const result:{tags:{GPSLongitude:number,GPSLatitude:number}} = parser.parse();
        const long = result.tags.GPSLongitude;
        const lat = result.tags.GPSLatitude;

        if(!long || !lat)
            throw new CannotDetectGpsError();
        return [long,lat];
    }


    private onMailParser(func : (mailObj:any) => Buffer|String): Promise<Buffer|String>{
        this.validEmlfile();

        const MailParser = require('mailparser-mit').MailParser;
        const mailparser = new MailParser();
        FileHandler.createReadStream(this.emlPath).pipe(mailparser);

        return new Promise((resolve,reject)=>{
            mailparser.on('end',(mailObj:{from:string},error:any)=>{
                if(mailObj != undefined)
                    resolve(func(mailObj));
                reject(error);
            })
        })
    } 



    private validEmlfile(){
        if(this.emlPath == "")
            throw new EmailFileIsNull();
    }
    


}