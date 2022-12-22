const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");

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
email:{
  type: String,//true
  required:false,
},
Type:{
  type: String,
  required:false,
}

}, { timestamps: true });

const Administrator = mongoose.model('Administrator', AdministratorSchema);




const validate = (Administrator) => {

  const schema = Joi.object({
       UserName: Joi.string().required(),
       email: Joi.string().email().required(),
       Password: Joi.string().required(),
       });
  return schema.validate(Administrator);
};

module.exports = { Administrator, validate };