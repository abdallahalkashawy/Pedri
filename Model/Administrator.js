const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
  UserName: {
    type: String,
    required: true
  },
Password:{
  type: String,
  required: true
},
Country:{
  type: String,
  required:false,
},
Type:{
  type: String,
  required:false,
}

}, { timestamps: true });

const Administrator = mongoose.model('Administrator', AdministratorSchema);
module.exports = Administrator;