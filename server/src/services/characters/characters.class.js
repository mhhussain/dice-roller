const { Service } = require('feathers-mongodb');

exports.Characters = class Characters extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('characters');
    });
  }
};
