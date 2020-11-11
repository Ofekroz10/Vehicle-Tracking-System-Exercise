/*
    This interface represents the abstraction of EmailProcessor.
    Every EmailProcessor implementation must implement this interface.
*/

export interface IEmailProcessor{
    setEmailFile (filePath:string) : void ;
    getEmployeeIDAsync() : Promise<string>;
    getAattachedImageAsync() : Promise<Buffer>;
    getLocationAsync() : Promise<[number,number]>
}