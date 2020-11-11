/*
    This interface is an abstraction for IQRProcessor
*/

export interface IQRProcessor{
    getPayloadAsync() : Promise<string>;
    setImg(img:Buffer): void;
    
}