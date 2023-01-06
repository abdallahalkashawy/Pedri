const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUserSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Type : {
        type: String,
        required: true
    },
});

NewUserSchema.statics.login = async function (UserName, Password) {
    const user = await this.findOne({ UserName });
    if (user) {
        const auth = await bcrypt.compare(Password, user.Password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
};

const NewUser = mongoose.model('NewUser', NewUserSchema);
module.exports = NewUser;