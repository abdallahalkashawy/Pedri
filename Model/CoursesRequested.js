
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursesRequestedSchema = new Schema({
  Course: {
    type: String,
    required: true,
    unique:true,

  },

  NameOfRequestor:{
  type: String,
  required:true,
}

}, );

const CoursesRequested = mongoose.model('CoursesRequested', coursesRequestedSchema);
module.exports = CoursesRequested;