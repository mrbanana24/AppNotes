import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Note from "../../components/Note";
import axios from "axios";
import MainHeader from "../../components/MainHeader";
import AppsIcon from "@mui/icons-material/Apps";
import Typography from "@mui/material/Typography";

const getArchivedNotes = async (setAllArchiveNotes) => {
  try {
    const response = await axios.get("http://localhost:8000/notes/archived");
    if (response.status === 200) {
      console.log("Notas obtenidas:", response.data);
      setAllArchiveNotes(response.data);
    }
  } catch (error) {
    console.error("Error trying to get the notes:", error);
  }
};

const handleDesArchiveNote = async (id, setAllArchiveNotes) => {
  try {
    console.log("Desarchivando nota...", { id });
    const response = await axios.patch(
      `http://localhost:8000/notes/updatenote`,
      { noteIsArchived: false },
      { params: { id } }
    );
    if (response.status === 200) {
      // Updating locally the state to avoid making another request to the server
      setAllArchiveNotes((prev) => prev.filter((note) => note._id !== id));
    }
  } catch (error) {
    console.error("Error trying to archive the note:", error);
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

const ArchivePage = () => {
  const [allArchiveNotes, setAllArchiveNotes] = useState([]);

  useEffect(() => {
    getArchivedNotes(setAllArchiveNotes);
  }, []);

  return (
    <Grid container spacing={2}>
      <MainHeader icon={<AppsIcon />} url="/mainpage" />
      <Grid item xs={12} sx={{ height: "20px" }} />
      {allArchiveNotes.length === 0 ? (
        <Typography variant="body1" sx={{ marginLeft: "50px" }}>
          Dont have any archived notes
        </Typography>
      ) : (
        <Grid container sx={{ marginLeft: "70px", marginRight: "20px" }}>
          {allArchiveNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
              <Note
                noteData={note}
                handleArchiveNote={() =>
                  handleDesArchiveNote(note._id, setAllArchiveNotes)
                }
                deleteNote={() => deleteNote(note._id, setAllArchiveNotes)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ArchivePage;
