const { charset } = require('mime-types');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema({
    UserName: {
      type: String,
      required: true,
      unique:true,
    },
    Email: {
      type: String,
      required: true
    },
    Password: {
      type: String,
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
      type: String,
      required: true
    },
    Wallet: {
      type: Number,
      required:false,
      default:0,
    },
    Country: {
      type: String,
      required: true
    }
  });

const IndividualTrainee = mongoose.model('IndividualTrainee', individualTraineeSchema);
module.exports = IndividualTrainee;