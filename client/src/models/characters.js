import { BaseModel } from '../feathers';

class Character extends BaseModel {
    constructor(data, options) {
        super(data, options);
    }

    static modelName = 'Character';
}

export default Character;
