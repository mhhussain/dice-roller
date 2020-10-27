const { Service } = require('feathers-mongodb');

exports.Rolls = class Rolls extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('rolls');
    });
  }
};
