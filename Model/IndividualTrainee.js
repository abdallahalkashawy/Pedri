const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true
    },
    Password: {
      type: Number,
      required: true,
    },
    FirstName: {
      type: String,
      required: true
    },
    LastName: {
      type: String,
      required: true
    },
    Gender: {
      type: char,
      required: true
    }
  });

const IndividualTrainee = mongoose.model('IndividualTrainee', individualTraineeSchema);
module.exports = IndividualTrainee;