// Note model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  noteTitle: {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 50,
  },
  noteContent: {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 1024,
  },
  noteImage: {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 1024,
  },
  noteIsArchived: {
    type: Boolean,
    required: false,
    default: false,
  },
  tags: [{ type: String, trim: true, maxlength: 50 }],
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
