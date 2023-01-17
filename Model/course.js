const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    
    title: {
      type: String,
      required: true,
      unique:true,
    },
    instructor: {
      type: String,
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
    isRegistered: {
      type: Boolean,
      required: false
    },
    Discount: {
      type: Number,
      required: false,
      Default : 0
    },
    Totalhours: {
      type: Number,
      required: true
    }
  });

const course = mongoose.model('course', courseSchema);

module.exports = course;