"use strict";
/*
    This class is an implementaion to IKMProcessor.
    This implementaion use a python script for the red rectangle detaction.
    This class usings TextDetection API for getting text from an image.

    *private img : Buffer | undefined- the whole image from the eml.
    *private readonly IMGNAME = 'Images/image.jpg' - the path to the image.
    *private readonly PY_SCRIPT = the path to the python script.
    *private readonly CONFIDENCE = 0.90 - confidence constant for text detection.
    *setImg - A setter for image.
    *saveImgAsync - Save the image in the disk.
    *getOutputFromPyScriptAsync- This function return the output from the pyscript
    using promise. The function use PythonShell lib for message passing between NodeJS
    process and python process.
    public async getKMAsync():Promise<string>{
    *getKMAsync- This function using the cropped image (as a result from python script execution)
    for text detection by using Cloudmersive API. If did succeed returns the text, else
    throws new CannotDetectKmError().
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMProcessor = void 0;
const TextDetectorApi_1 = require("./TextDetectorApi");
const ImageFileIsNullError_1 = __importDefault(require("./Errors/ImageFileIsNullError"));
const FileHandler_1 = require("./FileHandler");
const CannotDetectKmError_1 = __importDefault(require("./Errors/CannotDetectKmError"));
const python_shell_1 = require("python-shell");
class KMProcessor {
    constructor() {
        this.IMGNAME = 'Images/image.jpg';
        this.PY_SCRIPT = 'C:/Users/ofekr/OneDrive/Documents/Vehicle-Tracking-System-Exercise/srcJS/SrcPy/RectangleDetector/venv/Lib/site-packages/main.py';
        this.CONFIDENCE = 0.90;
        this.img = undefined;
    }
    validImg() {
        if (this.img === undefined)
            throw new ImageFileIsNullError_1.default();
    }
    setImg(img) {
        if (img === undefined)
            throw new ImageFileIsNullError_1.default();
        this.img = img;
    }
    saveImgAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validImg();
            return FileHandler_1.FileHandler.saveImage(this.IMGNAME, this.img);
        });
    }
    getOutputFromPyScriptAsync() {
        const { PythonShell } = require('python-shell');
        return new Promise((resolve, reject) => {
            const pyShell = new PythonShell(this.PY_SCRIPT);
            pyShell.on('message', (msg) => resolve(msg));
            pyShell.end((err) => {
                if (err)
                    reject(new python_shell_1.PythonShellError(err));
                resolve('');
            });
        });
    }
    ;
    getKMAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.getOutputFromPyScriptAsync();
            let files = [];
            results.split(',').filter(x => x != '').forEach((fName) => files.push(fName));
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const textObj = yield TextDetectorApi_1.getText(file);
                const { MeanConfidenceLevel, TextResult } = textObj;
                if (MeanConfidenceLevel >= this.CONFIDENCE && TextResult !== '' && this.hasNumber(TextResult)) {
                    return TextResult.replace(/\n/g, ' ');
                }
            }
            throw new CannotDetectKmError_1.default();
        });
    }
    getImgPath() {
        return this.IMGNAME;
    }
    hasNumber(str) {
        return /\d/.test(str);
    }
}
exports.KMProcessor = KMProcessor;
//# sourceMappingURL=KMProcessor.js.map