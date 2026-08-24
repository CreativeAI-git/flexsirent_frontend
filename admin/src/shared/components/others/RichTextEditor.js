import { useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/form/Loader";

const RichTextEditor = ({
  value,
  ref,
  onChange,
  placeholder = "Type here...",
  className = "form-control ct_input bg-white h-auto",
  ...rest
}) => {
  const { isLoading, policyData } = useSelector((state) => state.authReducers);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        policyData != "" ? policyData : value != '' ? value : ''
      );
      quill.on("text-change", (delta, oldDelta, source) => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, policyData]);

  if (isLoading) {
    return <Loader />;
  }
  return <div ref={quillRef} />;
};

export default RichTextEditor;
