/*
    This class represents an employee's report. 
    *toLog():string - returns the representation of the report for log file.
*/

import { ILogable } from "./ILogable";

export class LogItem implements ILogable{
    private employeeID:string;
    private location:[number,number];
    private vehicleID:string;
    private km:string;

    constructor(employeeID:string,location:[number,number],vehicleID:string,km:string){
        this.employeeID = employeeID;
        this.location= location;
        this.vehicleID = vehicleID;
        this.km = km;
    }

    public toLog():string{
        return JSON.stringify(this);
    }

}