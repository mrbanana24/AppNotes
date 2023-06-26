import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton, Chip, InputBase } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import useNote from "./useNote";
import useNoteImageUpload from "./useNoteImageUpload";

const Note = ({ noteData, deleteNote, handleArchiveNote, searchTag }) => {
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef(null);

  const {
    noteTitle,
    noteContent,
    tags,
    tagInput,
    handleTitleChange,
    handleTitleBlur,
    handleContentChange,
    handleContentBlur,
    handleTagsChange,
    handleTagsBlur,
    handleTagDelete,
  } = useNote(noteData);

  const { noteImage, handleImageUpload } = useNoteImageUpload(noteData);

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      setTextareaHeight("auto");
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  };

  useEffect(() => {
    handleTextareaInput();
  }, [noteContent]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        marginBottom: 4,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor={`upload-image-${noteData._id}`}>
        <input
          id={`upload-image-${noteData._id}`}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <CardMedia
          component="img"
          alt="Drop img"
          height="140"
          src={noteImage}
          style={{ cursor: "pointer" }}
        />
      </label>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <input
            type="text"
            placeholder="Título"
            value={noteTitle}
            onChange={(e) => handleTitleChange(e)}
            onBlur={(e) => handleTitleBlur(noteData._id, e)}
            style={{
              border: "none",
              outline: "none",
              fontSize: "1.2rem",
              width: "90%",
            }}
          />
        </Typography>
        <div
          style={{
            maxHeight: "150px",
            overflow: "auto",
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="Contenido"
            value={noteContent}
            onInput={(e) => {
              handleContentChange(e);
              handleTextareaInput();
            }}
            onBlur={(e) => handleContentBlur(noteData._id, e)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              resize: "none",
              height: textareaHeight,
              overflow: "hidden",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => {
                handleTagDelete(noteData._id, tag);
              }}
            />
          ))}
        </div>
        <InputBase
          type="text"
          placeholder="Tags"
          value={tagInput}
          onChange={(e) => handleTagsChange(e)}
          onBlur={(e) => handleTagsBlur(noteData._id, e)}
          style={{
            marginBottom: "10px",
            width: "100%",
            fontSize: "1rem",
            padding: "5px",
          }}
        />
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <IconButton
          aria-label="upload image"
          component="span"
          onClick={() => handleArchiveNote(noteData._id)}
        >
          <ArchiveIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => deleteNote(noteData._id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Note;
