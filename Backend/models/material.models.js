const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    courseId: String // Add courseId field
  },
  { collection: "materialdet" }
);

const MaterialInf = mongoose.model("MaterialInf", MaterialSchema);

module.exports = MaterialInf;