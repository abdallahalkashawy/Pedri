const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolvedExamSchema = new Schema({
  Code: {
    type: String,
    required: [true, "Please add a code"],
    unique: 'compositeIndex',
    index : true
  },
  TraineeID : {
    type: String,
    required: [true, "Please add a trainee ID"],
    unique: 'compositeIndex',
    index : true
    },
  Answer: [
    {
      ExerciseID: {
        type: String,
      },
      ExerciseAnswer: {
        type: String,
      },
    },
  ]
  
});

const SolvedExam = mongoose.model("SolvedExam", SolvedExamSchema);
module.exports = SolvedExam;
