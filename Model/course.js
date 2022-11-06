const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
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