const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema({
    UserName: {
      type: String,
      unique: [true, "Username already exists"],
      required: true
    },
    Email: {
      type: String,
      unique: [true, "Email already exists"],
      required: false,
    },
    Password: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: false
    },
    LastName: {
      type: String,
      required: false
    },
    Gender: {
      type: String,
      required: false
    },
    Country: {
      type: String,
      required: false
    }
  });

const IndividualTrainee = mongoose.model('IndividualTrainee', individualTraineeSchema);
module.exports = IndividualTrainee;