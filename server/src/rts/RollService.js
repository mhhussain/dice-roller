const rollsDb = require('../db/rolls');

class RollService {
    constructor() {
        this.db = rollsDb;
    }

    async find(sessionId) {
        const rolls = await this.db.find({ sessionId });
        return rolls;
    }

    async create(data) {
        const rng = Math.ceil(Math.random() * dvalue);
        const roll = {
            sessionId: data.sessionId,
            characterId: data.characterd,
            dvalue: data.dvalue,
            'roll': rng,
            name: 'roll',
            rollTime: new Date(),
            visible: false,
        };

        const createdRoll = await this.db.create(roll);
        return createdRoll;
    }
}

module.exports = RollService;
