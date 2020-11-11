"use strict";
/*
    This class an implementaion of IQRProcessor.
    *private img:Buffer | undefined - the image buffer from the eml file.
    *getPayloadAsync - return the payload from the QR. Using jsqr lib.

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
exports.QRProcessor = void 0;
const ImageFileIsNullError_1 = __importDefault(require("./Errors/ImageFileIsNullError"));
const QRError_1 = __importDefault(require("./Errors/QRError"));
class QRProcessor {
    constructor() {
        this.img = undefined;
    }
    setImg(img) {
        if (!img)
            throw new ImageFileIsNullError_1.default();
        this.img = img;
    }
    getPayloadAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.validImg();
            const jpeg = require('jpeg-js');
            const data = jpeg.decode(this.img);
            const out = {
                data: new Uint8ClampedArray(data.data),
                height: data.height,
                width: data.width,
            };
            const payload = yield this.asyncQR(out);
            if (payload === null)
                throw new QRError_1.default();
            return payload.data;
        });
    }
    asyncQR(out) {
        const jsQR = require("jsqr");
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(jsQR(out.data, out.width, out.height)), 0);
        });
    }
    validImg() {
        if (!this.img)
            throw new ImageFileIsNullError_1.default();
    }
}
exports.QRProcessor = QRProcessor;
//# sourceMappingURL=QRProcessor.js.map