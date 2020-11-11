import * as errConfig from './ErrorsConfig'

export default class ImageFileIsNull extends Error{

    constructor() {
        super(errConfig.imageFileIsNullError);
        Object.setPrototypeOf(this, ImageFileIsNull.prototype);
    }
}