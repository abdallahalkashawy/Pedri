const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdministratorSchema = new Schema({
  UserName: {
    type: String,
    required: false,
  },
Password:{
  type: String,
  required: false
},
Country:{
  type: String,
  required:false,
},
Type:{
  type: String,
  required:true,
}

}, { timestamps: true });

const Administrator = mongoose.model('Administrator', AdministratorSchema);
module.exports = Administrator;