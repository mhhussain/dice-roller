import { BaseModel } from '../feathers';

class Session extends BaseModel {
    constructor(data, options) {
        super(data, options);
    }

    static modelName = 'Session';
}

export default Session;
