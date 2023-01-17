const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefundSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
Course:{
  type: String,
  required: true
},
Price:{
  type: String,
  required:true,
},
Reason_for_Refund:{
  type: String,
  required:true,
}

});

const RefundRequests = mongoose.model('RefundRequests', RefundSchema);
module.exports = RefundRequests;