// material.model.js

const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "materialdet" }
);

const MaterialInf = mongoose.model("MaterialInf", MaterialSchema);

module.exports = MaterialInf;
