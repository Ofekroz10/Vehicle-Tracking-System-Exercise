import * as errConfig from './ErrorsConfig'

export default class QRError extends Error{

    constructor() {
        super(errConfig.qRError);
        Object.setPrototypeOf(this, QRError.prototype);
    }
}