const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseimage: {
      type: String,
      required: true,
    },
    coursecategory: {
      type: String,
      required: true,
    },
    coursedescription: {
      type: String,
      required: true,
    },
    
    // Add other fields as needed
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
