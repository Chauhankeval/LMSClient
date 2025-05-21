import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {

  const handleChange = (content) => {
    setInput({ ...input, description: content }); // This ensures it's saved as a string
  };
  
  return <ReactQuill theme="snow" value={input?.description} onChange={handleChange} />;
};

export default RichTextEditor;
