const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolvedExamSchema = new Schema({
  Code: {
    type: String,
    required: [true, "Please add a code"],
    unique: true,
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
  ],
  TraineeID : {
    type: String,
    required: [true, "Please add a trainee ID"],
    },
});

const SolvedExam = mongoose.model("SolvedExam", SolvedExamSchema);
module.exports = SolvedExam;
