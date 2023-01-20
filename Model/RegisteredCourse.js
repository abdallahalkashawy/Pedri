const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisteredCourseSchema = new Schema(
    {
        TraineeUsername: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    });

RegisteredCourseSchema.index({ TraineeUsername :1, title :1}, { unique: true });


const RegisteredCourse = mongoose.model("RegisteredCourse", RegisteredCourseSchema);
module.exports = RegisteredCourse;