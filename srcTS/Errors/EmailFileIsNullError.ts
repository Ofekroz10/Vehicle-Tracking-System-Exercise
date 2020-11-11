import * as errConfig from './ErrorsConfig'

export default class FileDontExist extends Error{

    constructor() {
        super(errConfig.emlFileIsNull);
        Object.setPrototypeOf(this, FileDontExist.prototype);
    }
}