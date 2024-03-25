const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "materialdet" }
);

mongoose.model("MaterialInf", MaterialSchema);