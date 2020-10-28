import { BaseModel } from '../feathers';

class User extends BaseModel {
    constructor(data, options) {
        super(data, options);
    }

    static modelName = 'User';
}

export default User;
