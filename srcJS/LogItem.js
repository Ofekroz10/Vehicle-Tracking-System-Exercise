"use strict";
/*
    This class represents an employee's report.
    *toLog():string - returns the representation of the report for log file.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogItem = void 0;
class LogItem {
    constructor(employeeID, location, vehicleID, km) {
        this.employeeID = employeeID;
        this.location = location;
        this.vehicleID = vehicleID;
        this.km = km;
    }
    toLog() {
        return JSON.stringify(this);
    }
}
exports.LogItem = LogItem;
//# sourceMappingURL=LogItem.js.map