const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        coordinatorEmail: { type: String },
        coordinatorDept: { type: String }  ,
        coordinatorClg: { type: String }  
    },
    {
        collection: "course",
    }
);

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;
