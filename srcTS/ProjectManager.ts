/*
    This class uses IEmailProcessor, IQRPRocessor, IKMProcessor in sync form.
    This class using BasicFactory for IEmailProcessor, IQRPRocessor, IKMProcessor objects.
    Execute the run function for getting the output of the exercise.
*/


import { BasicFactory } from './BasicFactory';
import { EmailProcessor } from './EmailProcessor';
import { FileHandler } from './FileHandler';
import {IEmailProcessor} from './IEmailProcessor'
import { IFactory } from './IFactory';
import { IKMProcessor } from './IKMProcessor';
import { IQRProcessor } from './IQRProcessor';
import { LogItem } from './LogItem';

export class ProjectManager{
    private emailProcessor: IEmailProcessor;
    private qrProcessor: IQRProcessor;
    private kmProcessor : IKMProcessor;
    private factory:IFactory;
    private readonly logFile = 'Logs/log.json';
    private emlFile:string;

    constructor(factory: IFactory){
        this.factory = factory;
        this.emailProcessor = this.factory.createIEmailProcessor();
        this.kmProcessor =this.factory.createIKMProcessor();
        this.qrProcessor = this.factory.createIQRProcessor();
        this.emlFile = process.argv[2];
    }

    async run():Promise<void>{
        this.emailProcessor.setEmailFile(this.emlFile);
        const id = await this.emailProcessor.getEmployeeIDAsync();
        const location = await this.emailProcessor.getLocationAsync();
        this.qrProcessor.setImg(await this.emailProcessor.getAattachedImageAsync());
        const vehicleId = await this.qrProcessor.getPayloadAsync();
        this.kmProcessor.setImg(await this.emailProcessor.getAattachedImageAsync());
        await this.kmProcessor.saveImgAsync();
        const km = await this.kmProcessor.getKMAsync();
        const res = new LogItem(id,location,vehicleId,km);
        await FileHandler.writeToLogFile(this.logFile,res);
        console.log(`done! see log file: ${this.logFile}`);
    }
}

