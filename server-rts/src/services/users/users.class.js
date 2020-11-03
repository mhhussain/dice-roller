const { Service } = require('feathers-mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }

  async create(data, params) {
    const existingUser = await this.find({
      query: {
        username: data.email
      },
    });

    if (existingUser.data.length != 0) {
      throw new Error('User already exists');
    }

    return await super.create(data, params);
  }
};
