import { UploadSvg } from "../svg";
import { WebURL } from "../../utills/pip";
import { useEffect, useState } from "react";
import ImageWithPreview from "../image preview/imageWithPreview";

const MediaUploader = ({
  onChange,
  maxFiles = 5,
  existImage = [],
  deleteMemberImage,
  label = "Attachments",
  accept = "image/*",
  placeholder = "Upload your images here",
}) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [existingMediaFiles, setExistingMediaFiles] = useState(
    existImage ?? []
  );

  useEffect(() => {
    if (existImage?.length != existingMediaFiles?.length) {
      setExistingMediaFiles(existImage ?? []);
    }
  }, [existImage]);
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const newFiles = selected
      .slice(0, maxFiles - mediaFiles.length)
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    const updatedFiles = [...mediaFiles, ...newFiles];
    setMediaFiles(updatedFiles);
    onChange && onChange(updatedFiles.map((item) => item.file));
  };

  const handleRemove = (index) => {
    setMediaFiles((prev) => {
      URL.revokeObjectURL(prev[index].url);
      const updated = prev.filter((_, i) => i !== index);
      onChange && onChange(updated.map((item) => item.file));
      return updated;
    });
  };

  const handleDeleteExistingFile = (fileData) => {
    const updated = existingMediaFiles.filter(
      (item) => item.property_image_id !== fileData.property_image_id
    );
    setExistingMediaFiles(updated);
    deleteMemberImage && deleteMemberImage(fileData);
  };

  const renderPreview = (media, isExisting = false) => {
    const url = isExisting ? media.image : media.url;
    return (
      <ImageWithPreview image={url} />
    );
  };

  return (
    <div class="form-group mb-4">
      <label for="" class="mb-2 ct_fw_500">
        {label}
      </label>
      <div class="ct_upload_product_main ct_upload_product_main_180 bg-transparent">
        <UploadSvg />
        <p class="text-center ct_fs_18 ct_text_op_07 mb-0">{placeholder}</p>
        <label for="ct_upload_product">
          <input
            type="file"
            accept={accept}
            multiple
            className="d-none"
            onChange={handleFileChange}
            disabled={mediaFiles.length >= maxFiles}
            id="ct_upload_product"
          />
          <div class="ct_browse_btn mt-3">
            <span>Browse Files</span>
          </div>
        </label>
      </div>
      <div class="ct_multiple_img_div ct_custom_scroll">
      
        {mediaFiles.map((media, index) => (
          <div class="ct_uploaded_img123 position-relative " key={index}>
            <div class="ct_uploaded_img_w">
              {renderPreview(media)}

              <i
                class="fa-solid fa-xmark"
                onClick={() => handleRemove(index)}
              ></i>
            </div>
          </div>
        ))}
        {existingMediaFiles.map((media, index) => (
          <div class="ct_uploaded_img123 position-relative " key={index}>
            <div class="ct_uploaded_img_w">
              {renderPreview(media, true)}

              <i
                class="fa-solid fa-xmark"
                onClick={() => handleDeleteExistingFile(media)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUploader;
