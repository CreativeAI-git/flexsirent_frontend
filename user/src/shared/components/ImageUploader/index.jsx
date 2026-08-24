import { UploadSvg } from "../svg";

const ImageUpload = ({
  name,
  label,
  subLabel = "",
  subLabelValue = "Upload a clear photo of your document",
  value,
  onChange,
  onBlur,
  error,
  touched,
  type = "image",
  isCrossIcon = true,
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
      <label className="ct_fs_16 ct_fw_600 mb-2">
        {label}
      </label>
      {subLabel && (
        <p className="mb-2 ct_fs_14 ct_text_op_6">
          {subLabelValue}
        </p>
      )}
      <div className={`position-relative ${value ? "d-none" : ""}`}>
        <div className="ct_upload_product_main ct_upload_product_main_180">
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
              disabledData
            />
            <div className="ct_browse_btn mt-3">
              <span>Browse Files</span>
            </div>
          </label>
        </div>
      </div>

      <div className={`ct_single_uploaded_img mt-3 ${value ? "" : "d-none"}`}>
        {value && type === "image" && (
          <img loading="lazy"

            src={fileUrl}
            className="ct_uploded_img"
            alt="Uploaded Preview"
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
        {isCrossIcon &&
          < i
            className="fa-solid fa-xmark ct_cursor_pointer ct_cancle_upload_video"
            onClick={handleRemove}
          ></i>
        }
      </div>
      {error && touched && <span style={{ color: "red" }}>{error}</span>}
    </div >
  );
};

export default ImageUpload;
