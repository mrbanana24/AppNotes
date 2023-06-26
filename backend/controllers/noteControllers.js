const Note = require("../models/noteModels");
const noteServices = require("../services/noteServices");

// Get notes
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await noteServices.getNotes({ noteIsArchived: false });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get archived notes
exports.getArchivedNotes = async (req, res, next) => {
  try {
    const notes = await noteServices.getNotes({ noteIsArchived: true });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get all notes
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteServices.getNotes({});
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get notes by tag
exports.getNotesByTag = async (req, res, next) => {
  const { tag } = req.query;
  try {
    const notes = await noteServices.getNotes({
      noteIsArchived: false,
      tags: { $in: [tag] },
    });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Create note
exports.createNote = async (req, res, next) => {
  try {
    const newNote = await noteServices.createNote();
    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Delete note
exports.deleteNote = async (req, res, next) => {
  const { id } = req.query;
  try {
    const note = await noteServices.deleteNote(id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Update note
exports.updateNote = async (req, res, next) => {
  const { id } = req.query;
  const { noteTitle, noteContent, noteImage, noteIsArchived, tags } = req.body;
  try {
    const updatedNote = await noteServices.updateNote(id, {
      noteTitle,
      noteContent,
      noteImage,
      noteIsArchived,
      tags,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};
