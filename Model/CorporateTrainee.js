const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorporateTraineeSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    unique:true,
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
},
Registered_Courses:{
  type: Array,
  required:false,

  
}


},


{ timestamps: true });

const CorporateTrainee = mongoose.model('CorporateTrainee', CorporateTraineeSchema);

const validate2 = (CorporateTrainee) => {

  const schema = Joi.object({
       UserName: Joi.string().required(),
       email: Joi.string().email().required(),
       Password: Joi.string().required(),
       });
  return schema.validate(CorporateTrainee);
};

module.exports = { CorporateTrainee, validate2 };


