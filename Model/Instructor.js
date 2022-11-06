const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
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

const Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;