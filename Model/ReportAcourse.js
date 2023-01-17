const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
CourseID:{
  type: String,
  required: true
},
Report_Type:{
  type: String,
  required:true,
},
Report_Description:{
  type: String,
  required:true,
},
Report_Status:{
  type: String,
  required:true,
},
Followup_Note:{
  type: String,
  required:false,
  default: ""
},

}, { timestamps: true });

const ReportAcourse = mongoose.model('ReportAcourse', ReportSchema);
module.exports = ReportAcourse;