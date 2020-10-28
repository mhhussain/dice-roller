const { Service } = require('feathers-mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }

  async create(data, params) {
    console.dir(data);
    const existingUser = await this.find({ username: data.email });
    console.dir(existingUser.data);
    if (existingUser) {
      throw new Error('User already exists');
    }

    return await super.create(data, params);
  }
};
