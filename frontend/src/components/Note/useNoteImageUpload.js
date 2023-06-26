import { useState } from "react";
import axios from "axios";

const useNoteImageUpload = (noteData) => {
  const [noteImage, setNoteImage] = useState(noteData.noteImage);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setNoteImage(e.target.result);
      updateNoteImage(noteData._id, e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const updateNoteImage = async (id, image) => {
    try {
      await axios.patch(
        `http://localhost:8000/notes/updatenote`,
        { noteImage: image },
        { params: { id } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    noteImage,
    handleImageUpload,
  };
};

export default useNoteImageUpload;
