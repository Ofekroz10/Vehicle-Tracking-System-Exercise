"use strict";
/*
    A module for handeling files.
    * isExist() - Return true if the filePath exists.
    *createReadStream = (path:string) - Return read stream from this file.
    * saveImage(name,buf)= Gets the binary image as buffer, and save it into the disk.
    * writeToLogFile = async (fName:string,obj: ILogable)- Gets logable object and save the object
    to a file.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs = require("fs");
const fsPromises = require("fs").promises;
var FileHandler;
(function (FileHandler) {
    FileHandler.isExist = (filePath) => fs.existsSync(filePath);
    FileHandler.createReadStream = (path) => fs.createReadStream(path);
    FileHandler.saveImage = (name, img) => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const buf = Buffer.from(img, 'base64');
        yield fsPromises.writeFile(name, buf);
    });
    FileHandler.writeToLogFile = (fName, obj) => __awaiter(this, void 0, void 0, function* () {
        yield fsPromises.writeFile(fName, obj.toLog());
    });
})(FileHandler = exports.FileHandler || (exports.FileHandler = {}));
//# sourceMappingURL=FileHandler.js.map