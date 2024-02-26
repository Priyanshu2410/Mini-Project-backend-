const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        coordinatorEmail: { type: String }  // Add this field
    },
    {
        collection: "course",
    }
);

const Course = mongoose.model('course', CourseSchema);

module.exports = Course;
