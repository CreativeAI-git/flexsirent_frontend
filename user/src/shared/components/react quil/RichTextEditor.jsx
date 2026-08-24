
import React from "react";
import ReactQuill from "react-quill";


const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Type here...",
  className = "form-control ct_input bg-white h-auto",
  ...rest
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    //   ["link", "image", "video"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder}
      className={className}
      {...rest}
    />
  );
};

export default RichTextEditor;
