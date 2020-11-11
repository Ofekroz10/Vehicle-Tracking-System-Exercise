"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailProcessor = void 0;
const FileDontExistError_1 = __importDefault(require("./Errors/FileDontExistError"));
const EmailFileIsNullError_1 = __importDefault(require("./Errors/EmailFileIsNullError"));
const CannotDetectGpsError_1 = __importDefault(require("./Errors/CannotDetectGpsError"));
const FileHandler_1 = require("./FileHandler");
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
class EmailProcessor {
    constructor() {
        this.emlPath = "";
    }
    setEmailFile(path) {
        if (!FileHandler_1.FileHandler.isExist(path))
            throw new FileDontExistError_1.default();
        this.emlPath = path;
    }
    getEmployeeIDAsync() {
        const getFrom = (mailObj) => mailObj.from[0].address;
        return this.onMailParser(getFrom);
    }
    getAattachedImageAsync() {
        const getAttachedImage = (mailObj) => {
            const file = mailObj.attachments[0].content;
            return file;
        };
        return this.onMailParser(getAttachedImage);
    }
    getLocationAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileBuffer = yield this.getAattachedImageAsync();
            const parser = require('exif-parser').create(fileBuffer);
            const result = parser.parse();
            const long = result.tags.GPSLongitude;
            const lat = result.tags.GPSLatitude;
            if (!long || !lat)
                throw new CannotDetectGpsError_1.default();
            return [long, lat];
        });
    }
    onMailParser(func) {
        this.validEmlfile();
        const MailParser = require('mailparser-mit').MailParser;
        const mailparser = new MailParser();
        FileHandler_1.FileHandler.createReadStream(this.emlPath).pipe(mailparser);
        return new Promise((resolve, reject) => {
            mailparser.on('end', (mailObj, error) => {
                if (mailObj != undefined)
                    resolve(func(mailObj));
                reject(error);
            });
        });
    }
    validEmlfile() {
        if (this.emlPath == "")
            throw new EmailFileIsNullError_1.default();
    }
}
exports.EmailProcessor = EmailProcessor;
//# sourceMappingURL=EmailProcessor.js.map