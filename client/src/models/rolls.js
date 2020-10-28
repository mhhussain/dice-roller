import { BaseModel } from '../feathers';

class Roll extends BaseModel {
    constructor(data, options) {
        super(data, options);
    }

    static modelName = 'Roll';
}

export default Roll;
