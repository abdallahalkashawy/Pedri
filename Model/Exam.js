const mongoose = require("mongoose");
const { stringify } = require("qs");
const Schema = mongoose.Schema;
// {
//     type: [String],
//     required: true,
//     validate:[ arrayLimit, '{PATH} exceeds the limit of 4'],
//     size : 4,
//     default : undefined
// }

const Excercise = new mongoose.Schema({
  ExerciseID: {
    type: String,
  },
  Question: {
    type: String,
    required: [true, "Please add a question"],
    default: undefined,
  },
  Choices: {
    type: [String],
    required: [true, "Please add choices"],
    validate: [
      {
        validator: function(val) {
          return val.every(item => item !== null);
        },
        message: 'must enter all choices'
      }
    ],
    default: undefined,
  },
});

const ExamSchema = new Schema({
  Code: {
    type: String,
    required: [true, "Please add a code"],
    unique: true,
  },
  Question: {
    type: [Excercise],
    required: [true, "Please add a question"],
    default: undefined,
  },
  Answer:[{
    ExerciseID:
     {
      type: String,
    },
    ExerciseAnswer: {
      type: String,
    },
  }],
  UserName: {
    type: String,
    required: [true, "Please add an instructor ID"],
  },
});

function arrayLimit(val) {
  return val.length === 4 ;
}

const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
