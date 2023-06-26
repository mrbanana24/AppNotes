import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import AddButton from "../../components/AddButton";
import Note from "../../components/Note";
import axios from "axios";
import MainHeader from "../../components/MainHeader";
import ArchiveIcon from "@mui/icons-material/Archive";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const getNotes = async (setAllNotes) => {
  try {
    const response = await axios.get("http://localhost:8000/notes");
    if (response.status === 200) {
      console.log("Notas obtenidas:", response.data);
      setAllNotes(response.data);
    }
  } catch (error) {
    console.error("Error trying to get the notes:", error);
  }
};

const addEmptyNote = async (setAllNotes) => {
  try {
    console.log("Creando nota...");
    const response = await axios.post("http://localhost:8000/notes/newnote");
    if (response.status === 200) {
      // Updating locally the state to avoid making another request to the server
      setAllNotes((prev) => [...prev, response.data]);
    }
  } catch (error) {
    console.error("Error trying to create a note:", error);
  }
};

const deleteNote = async (id, setAllNotes) => {
  try {
    console.log("Eliminando nota...", { id });
    const response = await axios.delete(
      `http://localhost:8000/notes/deletenote`,
      { params: { id } }
    );
    if (response.status === 200) {
      // Updating locally the state to avoid making another request to the server
      setAllNotes((prev) => prev.filter((note) => note._id !== id));
    }
  } catch (error) {
    console.error("Error trying to delete the note:", error);
  }
};

const handleArchiveNote = async (id, setAllNotes) => {
  try {
    console.log("Archivando nota...", { id });
    const response = await axios.patch(
      `http://localhost:8000/notes/updatenote`,
      { noteIsArchived: true },
      { params: { id } }
    );
    if (response.status === 200) {
      // Updating locally the state to avoid making another request to the server
      setAllNotes((prev) => prev.filter((note) => note._id !== id));
    }
  } catch (error) {
    console.error("Error trying to archive the note:", error);
  }
};

const filterNotesByTag = (notes, tag) => {
  if (!tag) {
    return notes;
  }
  return notes.filter((note) => {
    if (note.tags && Array.isArray(note.tags)) {
      return note.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()));
    }
    return false;
  });
};

const MainPage = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  console.log({ allNotes });

  useEffect(() => {
    getNotes(setAllNotes);
  }, []);

  const searchNoteByTag = (tag) => {
    const filteredNotes = filterNotesByTag(allNotes, tag);
    setFilteredNotes(filteredNotes);
  };

  useEffect(() => {
    const filtered = filterNotesByTag(allNotes, searchTag);
    setFilteredNotes(filtered);
  }, [allNotes, searchTag]);

  return (
    <Grid container spacing={2}>
      <MainHeader icon={<ArchiveIcon />} url="/archive" />
      <Grid item xs={12} sx={{ height: "20px" }} />
      {/* Search input */}
      <Grid
        item
        xs={12}
        sx={{ marginLeft: "70px", marginRight: "20px", marginBottom: "40px" }}
      >
        <TextField
          label="Search by Tag"
          variant="outlined"
          fullWidth
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          onBlur={() => searchNoteByTag(searchTag)}
        />
      </Grid>
      {/* List of existing notes */}
      <Grid container sx={{ marginLeft: "70px", marginRight: "20px" }}>
        {filteredNotes.length === 0 ? (
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Typography variant="h6" component="div" gutterBottom>
              No notes found!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Try a different tag or create a new note.
            </Typography>
          </Grid>
        ) : (
          filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
              <Note
                noteData={note}
                deleteNote={() => deleteNote(note._id, setAllNotes)}
                handleArchiveNote={() =>
                  handleArchiveNote(note._id, setAllNotes)
                }
                searchTag={searchTag}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Create new notes */}
      <Grid
        item
        xs={12}
        sx={{ position: "fixed", bottom: "40px", right: "40px" }}
      >
        <AddButton action={() => addEmptyNote(setAllNotes)} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
