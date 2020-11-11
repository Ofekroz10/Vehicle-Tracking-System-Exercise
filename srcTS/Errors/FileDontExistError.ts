import * as errConfig from './ErrorsConfig'

export default class FileDontExist extends Error{

    constructor() {
        super(errConfig.fileDontExistMsg);
        Object.setPrototypeOf(this, FileDontExist.prototype);
    }
}