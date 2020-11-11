import { IEmailProcessor } from "./IEmailProcessor";
import { IKMProcessor } from "./IKMProcessor";
import { IQRProcessor } from "./IQRProcessor";

/*
     This interface represents the abstraction of IFactory. 
*/


export interface IFactory{
    createIEmailProcessor() : IEmailProcessor;
    createIQRProcessor() : IQRProcessor;
    createIKMProcessor() : IKMProcessor;
}