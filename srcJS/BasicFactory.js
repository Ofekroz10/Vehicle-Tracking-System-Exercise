"use strict";
/*
    This class implements the IFactory interface.
    The function return objects according to the implementation that
    required in the exercise.
    If later we required to change the implementation of the objects,
    just inherit from the IFactory and return other objects.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicFactory = void 0;
const EmailProcessor_1 = require("./EmailProcessor");
const KMProcessor_1 = require("./KMProcessor");
const QRProcessor_1 = require("./QRProcessor");
class BasicFactory {
    createIEmailProcessor() {
        return new EmailProcessor_1.EmailProcessor();
    }
    createIQRProcessor() {
        return new QRProcessor_1.QRProcessor();
    }
    createIKMProcessor() {
        return new KMProcessor_1.KMProcessor();
    }
}
exports.BasicFactory = BasicFactory;
//# sourceMappingURL=BasicFactory.js.map