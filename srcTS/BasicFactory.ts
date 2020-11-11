/*
    This class implements the IFactory interface.
    The function return objects according to the implementation that
    required in the exercise.
    If later we required to change the implementation of the objects,
    just inherit from the IFactory and return other objects.
*/

import { EmailProcessor } from "./EmailProcessor";
import { IFactory } from "./IFactory";
import { KMProcessor } from "./KMProcessor";

import {QRProcessor} from './QRProcessor'

export class BasicFactory implements IFactory{
    
    createIEmailProcessor(){
        return new EmailProcessor();
    }

    createIQRProcessor(){
        return new QRProcessor();
    }

    createIKMProcessor(){
        return new KMProcessor();
    }
}