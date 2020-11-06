const { Service } = require('feathers-mongodb');

exports.Rolls = class Rolls extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('rolls');
    });
  }

  async create(data, params) {
    const newRoll = {
      sessionId: data.sessionId,
      characterId: data.characterId,
      dvalue: data.dvalue,
      roll: Math.ceil(Math.random() * data.dvalue),
      name: data.name,
      rollTime: new Date(),
      visible: false,
      userId: data.userId,
    };

    return super.create(newRoll, params);
  }

  async patch(id, data, params) {
    const patchRoll = {
      _id: id,
    };

    if (typeof data.name != 'undefined') {
      patchRoll.name = data.name;
    }

    if (typeof data.visible != 'undefined') {
      patchRoll.visible = data.visible;
    }

    return super.patch(id, patchRoll, params);
  }

  /*async find(params) {
    const { user } = params;
    const rolls = await super.find(params);

    const a = await rolls.data.map(r => {
      return {
        sessionId: r.sessionId,
        characterId: r.characterId,
        userId: r.userId.toString(),
        dvalue: r.userId.toString() === user._id.toString() || r.visible ? r.dvalue : null,
        roll: r.userId.toString() === user._id.toString() || r.visible ? r.roll : null,
        name: r.name,
        rollTime: r.rollTime,
        visible: r.visible,
      };
    });

    return a;
  }*/
};
