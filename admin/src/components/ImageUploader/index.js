import { UploadSvg } from "../svg";

const ImageUpload = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = "image",
  placeholderLabel = "Upload your image here",
}) => {
  const acceptedTypes =
    type === "video"
      ? "video/mp4,video/quicktime,video/webm,video/x-matroska"
      : "image/*";

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    onChange(name, file);
    event.target.value = null;
  };

  const handleRemove = () => {
    onChange(name, "");
  };

  const isString = typeof value === "string";
  const fileUrl = isString ? value : value ? URL.createObjectURL(value) : "";
  return (
    <div className="form-group mb-0">
      <label htmlFor={`ct_upload_${name}`} className="ct_fs_16 ct_fw_600 mb-2">
        {label} <span className="text-danger">*</span>
      </label>

      <div className={`position-relative ${value ? "d-none" : ""}`}>
        <div className="ct_upload_product_main bg-white ct_border_radius_10">
          <UploadSvg />
          <p className="text-center ct_fs_18 ct_text_op_07 mb-0">
            {placeholderLabel}
          </p>
          <label htmlFor={`ct_upload_${name}`}>
            <input
              type="file"
              accept={acceptedTypes}
              id={`ct_upload_${name}`}
              className="d-none"
              onChange={handleFileChange}
              onBlur={() => onBlur(name, true)}
            />
            <div className="ct_browse_btn mt-3">
              <span>Browse Files</span>
            </div>
          </label>
        </div>
      </div>

      <div
        className={`ct_uploaded_img position-relative  h-auto mt-2 ${
          value ? "" : "d-none"
        }`}
      >
        {value && type === "image" && (
          <img  loading="lazy"
            
            src={fileUrl}
            className="ct_uploded_img"
            style={{ maxHeight: "250px", width: "100%", objectFit: "cover" }}
           alt="img"
          />
        )}
        {value && type === "video" && (
          <video
            controls
            className="ct_uploded_img position-relative"
            style={{ maxHeight: "250px", width: "100%", objectFit: "cover" }}
          >
            <source src={fileUrl} />
            Your browser does not support the video tag.
          </video>
        )}

        <i
          className="fa-solid fa-xmark ct_cursor_pointer ct_cancle_upload_video"
          onClick={handleRemove}
        ></i>
      </div>

      {error && touched && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default ImageUpload;
