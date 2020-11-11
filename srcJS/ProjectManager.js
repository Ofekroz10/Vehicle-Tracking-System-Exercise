"use strict";
/*
    This class uses IEmailProcessor, IQRPRocessor, IKMProcessor in sync form.
    This class using BasicFactory for IEmailProcessor, IQRPRocessor, IKMProcessor objects.
    Execute the run function for getting the output of the exercise.
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
exports.ProjectManager = void 0;
const FileHandler_1 = require("./FileHandler");
const LogItem_1 = require("./LogItem");
class ProjectManager {
    constructor(factory) {
        this.logFile = 'Logs/log.json';
        this.factory = factory;
        this.emailProcessor = this.factory.createIEmailProcessor();
        this.kmProcessor = this.factory.createIKMProcessor();
        this.qrProcessor = this.factory.createIQRProcessor();
        this.emlFile = process.argv[2];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emailProcessor.setEmailFile(this.emlFile);
            const id = yield this.emailProcessor.getEmployeeIDAsync();
            const location = yield this.emailProcessor.getLocationAsync();
            this.qrProcessor.setImg(yield this.emailProcessor.getAattachedImageAsync());
            const vehicleId = yield this.qrProcessor.getPayloadAsync();
            this.kmProcessor.setImg(yield this.emailProcessor.getAattachedImageAsync());
            yield this.kmProcessor.saveImgAsync();
            const km = yield this.kmProcessor.getKMAsync();
            const res = new LogItem_1.LogItem(id, location, vehicleId, km);
            yield FileHandler_1.FileHandler.writeToLogFile(this.logFile, res);
            console.log(`done! see log file: ${this.logFile}`);
        });
    }
}
exports.ProjectManager = ProjectManager;
//# sourceMappingURL=ProjectManager.js.map