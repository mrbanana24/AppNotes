const Note = require("../models/noteModels");

// Service Get notes
const getNotes = async (filter) => {
  return await Note.find(filter);
};

// Service Create note
const createNote = async () => {
  // Create new empty note
  const note = new Note({
    noteTitle: "",
    noteContent: "",
    noteImage: "",
    noteIsArchived: false,
    tags: [],
  });

  // Save new note
  return await note.save();
};

// Service Delete note
const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

const updateNote = async (id, note) => {
  const newData = {};
  const { noteTitle, noteContent, noteImage, noteIsArchived, tags } = note;

  if (noteTitle !== undefined) newData.noteTitle = noteTitle;
  if (noteContent !== undefined) newData.noteContent = noteContent;
  if (noteImage !== undefined) newData.noteImage = noteImage;
  if (noteIsArchived !== undefined) newData.noteIsArchived = noteIsArchived;
  if (tags !== undefined) newData.tags = tags;

  return await Note.findByIdAndUpdate(id, newData);
};

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
