const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteControllers");

// Get notes
router.get("/", noteController.getNotes);

// Get all archived notes route
router.get("/archived", noteController.getArchivedNotes);

// Get all notes route
router.get("/all", noteController.getAllNotes);

// Get notes by tag route
router.get("/tag", noteController.getNotesByTag);

// Create note route
router.post("/newnote", noteController.createNote);

// Delete note route
router.delete("/deletenote", noteController.deleteNote);

// Update note route
router.patch("/updatenote", noteController.updateNote);

module.exports = router;
