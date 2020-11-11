import * as errConfig from './ErrorsConfig'

export default class CannotDetectGpsError extends Error{

    constructor() {
        super(errConfig.cannotDetectGpsError);
        Object.setPrototypeOf(this, CannotDetectGpsError.prototype);
    }
}