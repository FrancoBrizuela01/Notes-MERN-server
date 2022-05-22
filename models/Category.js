const mongoose = require("mongoose");

const CategorySheme = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Category", CategorySheme);
