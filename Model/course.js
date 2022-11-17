const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    
    title: {
      type: String,
      required: true,
    },
    instructor: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    Status: {
      type: String,
      required: true
    },
    Totalhours: {
      type: Number,
      required: true
    }
  });

const course = mongoose.model('course', courseSchema);
module.exports = course;