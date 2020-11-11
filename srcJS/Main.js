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
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectManager_1 = require("./ProjectManager");
const BasicFactory_1 = require("./BasicFactory");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectManager = new ProjectManager_1.ProjectManager(new BasicFactory_1.BasicFactory());
    yield projectManager.run();
});
main().catch(x => console.log(`Error: ${x}`));
//# sourceMappingURL=Main.js.map