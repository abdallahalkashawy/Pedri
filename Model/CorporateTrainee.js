const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CorporateTraineeSchema = new Schema(
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

const CorporateTrainee = mongoose.model(
  "CorporateTrainee",
  CorporateTraineeSchema
);
module.exports = CorporateTrainee;
