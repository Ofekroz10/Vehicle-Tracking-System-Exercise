/*
    This interface represents the abstraction of IKMProcessor.
*/

export interface IKMProcessor{
    setImg(img:Buffer) : void;
    saveImgAsync() : Promise<void>;
    getImgPath() : string;
    getKMAsync(): Promise<string>;
}