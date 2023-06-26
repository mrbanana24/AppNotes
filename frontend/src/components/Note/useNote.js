import { useState } from "react";
import axios from "axios";

const useNote = (noteData) => {
  const [noteTitle, setNoteTitle] = useState(noteData.noteTitle);
  const [noteContent, setNoteContent] = useState(noteData.noteContent);
  const [tags, setTags] = useState(noteData.tags);
  const [tagInput, setTagInput] = useState("");

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setNoteTitle(value);
  };

  const handleTitleBlur = (id, event) => {
    const { value } = event.target;
    axios.patch(
      `http://localhost:8000/notes/updatenote`,
      { noteTitle: value },
      { params: { id } }
    );
  };

  const handleContentChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleContentBlur = (id, event) => {
    const { value } = event.target;
    axios.patch(
      `http://localhost:8000/notes/updatenote`,
      { noteContent: value },
      { params: { id } }
    );
  };

  const handleTagsChange = (event) => {
    const { value } = event.target;
    setTagInput(value);
  };

  const handleTagsBlur = (id, event) => {
    const { value } = event.target;
    const newTags = [...tags, value];
    axios
      .patch(
        `http://localhost:8000/notes/updatenote`,
        { tags: newTags },
        { params: { id } }
      )
      .then(() => {
        setTags(newTags);
        setTagInput("");
      })
      .catch((error) => {
        console.log("Error al actualizar las etiquetas:", error);
      });
  };

  const handleTagDelete = async (id, tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    axios
      .patch(
        `http://localhost:8000/notes/updatenote`,
        { tags: newTags },
        { params: { id } }
      )
      .then(() => {
        setTags(newTags);
      })
      .catch((error) => {
        console.log("Error al borrar la etiqueta:", error);
      });
  };

  return {
    // States
    noteTitle,
    noteContent,
    tags,
    tagInput,
    // Title updates
    handleTitleChange,
    handleTitleBlur,
    // Content updates
    handleContentChange,
    handleContentBlur,
    // Tags updates
    handleTagsChange,
    handleTagsBlur,
    handleTagDelete,
  };
};

export default useNote;
