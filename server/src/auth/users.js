const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const usersSchema = new Schema({
    username: String,
    email: String,
    password: String,
    salt: String
});

usersSchema.methods.generateSalt = () => {
    return bcrypt.genSaltSync(8);
};

usersSchema.methods.generateHash = (password, salt) => {
    return bcrypt.hashSync(password, salt, null);
};

// This is required to be a proper function due to scope issues
// with 'this' object
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', usersSchema);
