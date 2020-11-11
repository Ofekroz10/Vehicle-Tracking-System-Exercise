import * as errConfig from './ErrorsConfig'

export default class CannotDetectKmError extends Error{

    constructor() {
        super(errConfig.cannotDetectKmError);
        Object.setPrototypeOf(this, CannotDetectKmError.prototype);
    }
}