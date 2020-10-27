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
      name: data.name,
      visible: data.visible,
    };

    return super.patch(id, patchRoll, params);
  }
};
