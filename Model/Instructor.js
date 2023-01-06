const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstructorSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", InstructorSchema);
module.exports = Instructor;
