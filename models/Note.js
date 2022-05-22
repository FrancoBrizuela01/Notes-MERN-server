const mongoose = require("mongoose");

const NoteScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Note", NoteScheme);
