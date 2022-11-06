const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorporateTraineeSchema = new Schema({
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

const CorporateTrainee = mongoose.model('CorporateTrainee', CorporateTraineeSchema);
module.exports = CorporateTrainee;