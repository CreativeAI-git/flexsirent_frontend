// import { UploadSvg } from "../svg";
// import { WebURL } from "../../utils/pip";
// import { useEffect, useState } from "react";
// import ImageWithPreview from "../image preview/imageWithPreview";

// const MediaUploader = ({
//   onChange,
//   maxFiles = 5,
//   existImage = [],
//   deleteMemberImage,
//   label = "Attachments",
//   accept = "image/*",
//   placeholder = "Upload your images here",
// }) => {
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [existingMediaFiles, setExistingMediaFiles] = useState(
//     existImage ?? []
//   );

//   useEffect(() => {
//     if (existImage?.length != existingMediaFiles?.length) {
//       setExistingMediaFiles(existImage ?? []);
//     }
//   }, [existImage]);

//   const handleFileChange = (e) => {
//     const selected = Array.from(e.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );

//     const newFiles = selected
//       .slice(0, maxFiles - mediaFiles.length)
//       .map((file) => ({
//         file,
//         url: URL.createObjectURL(file),
//       }));

//     const updatedFiles = [...mediaFiles, ...newFiles];
//     setMediaFiles(updatedFiles);
//     onChange && onChange(updatedFiles.map((item) => item.file));
//   };

//   const handleRemove = (index) => {
//     setMediaFiles((prev) => {
//       URL.revokeObjectURL(prev[index].url);
//       const updated = prev.filter((_, i) => i !== index);
//       onChange && onChange(updated.map((item) => item.file));
//       return updated;
//     });
//   };

//   const handleDeleteExistingFile = (fileData) => {
//     const updated = existingMediaFiles.filter(
//       (item) => item.property_image_id !== fileData.property_image_id
//     );
//     setExistingMediaFiles(updated);
//     deleteMemberImage && deleteMemberImage(fileData);
//   };

//   const renderPreview = (media, isExisting = false) => {
//     const url = isExisting ? WebURL + media.image : media.url;

//     return (
//       <ImageWithPreview image={url} />
//     );
//   };

//   return (
//     <div className="form-group mb-4">
//       <label for="" className="mb-2 ct_fw_500">
//         {label}
//       </label>
//       <div className="ct_upload_product_main ct_upload_product_main_180 bg-transparent">
//         <UploadSvg />
//         <p className="text-center ct_fs_18 ct_text_op_07 mb-0">{placeholder}</p>
//         <label for="ct_upload_product">
//           <input
//             type="file"
//             accept={accept}
//             multiple
//             className="d-none"
//             onChange={handleFileChange}
//             disabled={mediaFiles.length >= maxFiles}
//             id="ct_upload_product"
//           />
//           <div className="ct_browse_btn mt-3">
//             <span>Browse Files</span>
//           </div>
//         </label>
//       </div>
//       <div className="ct_multiple_img_div ct_custom_scroll">
//         {mediaFiles.map((media, index) => (
//           <div className="ct_uploaded_img123 position-relative " key={index}>
//             <div className="ct_uploaded_img_w">
//               {renderPreview(media)}

//               <i
//                 className="fa-solid fa-xmark"
//                 onClick={() => handleRemove(index)}
//               ></i>
//             </div>
//           </div>
//         ))}
//         {existingMediaFiles.map((media, index) => (
//           <div className="ct_uploaded_img123 position-relative " key={index}>
//             <div className="ct_uploaded_img_w">
//               {renderPreview(media, true)}

//               <i
//                 className="fa-solid fa-xmark"
//                 onClick={() => handleDeleteExistingFile(media)}
//               ></i>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MediaUploader;


import { useEffect, useState } from "react";
import { UploadSvg } from "../svg";
import { WebURL } from "../../utils/pip";
import ImageWithPreview from "../image preview/imageWithPreview";

const MediaUploader = ({
  onChange,
  maxFiles = 5,
  existImage = [],
  initialFiles = [],
  deleteMemberImage,
  onDeleteImageIdsChange,
  label = "Attachments",
  accept = "image/*",
  placeholder = "Upload your images here",
}) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [existingMediaFiles, setExistingMediaFiles] = useState(existImage ?? []);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

  useEffect(() => {
    if (existImage?.length !== existingMediaFiles?.length) {
      setExistingMediaFiles(existImage ?? []);
    }
  }, [existImage]);

  useEffect(() => {
    if (!initialFiles?.length) {
      setMediaFiles((prev) => {
        prev.forEach((item) => item?.url && URL.revokeObjectURL(item.url));
        return [];
      });
      return;
    }

    setMediaFiles((prev) => {
      prev.forEach((item) => item?.url && URL.revokeObjectURL(item.url));
      return initialFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
    });
  }, [initialFiles]);

  useEffect(() => {
    onDeleteImageIdsChange && onDeleteImageIdsChange(deletedImageIds);
  }, [deletedImageIds]);

  useEffect(() => {
    return () => {
      mediaFiles.forEach((item) => item?.url && URL.revokeObjectURL(item.url));
    };
  }, [mediaFiles]);

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
    setDeletedImageIds((prev) => [...prev, fileData.property_image_id]);
    deleteMemberImage && deleteMemberImage(fileData);
  };

  const renderPreview = (media, isExisting = false) => {
    const url = isExisting ? media.image : media.url;
    return <ImageWithPreview image={url} />;
  };

  return (
    <div className="form-group mb-4">
      <label className="mb-2 ct_fw_500">{label}</label>
      <div className="ct_upload_product_main ct_upload_product_main_180 bg-transparent">
        <UploadSvg />
        <p className="text-center ct_fs_18 ct_text_op_07 mb-0">{placeholder}</p>
        <label htmlFor="ct_upload_product">
          <input
            type="file"
            accept={accept}
            multiple
            className="d-none"
            onChange={handleFileChange}
            disabled={mediaFiles.length >= maxFiles}
            id="ct_upload_product"
          />
          <div className="ct_browse_btn mt-3">
            <span>Browse Files</span>
          </div>
        </label>
      </div>

      <div className="ct_multiple_img_div ct_custom_scroll">
        {mediaFiles.map((media, index) => (
          <div className="ct_uploaded_img123 position-relative" key={index}>
            <div className="ct_uploaded_img_w">
              {renderPreview(media)}
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleRemove(index)}
              ></i>
            </div>
          </div>
        ))}

        {existingMediaFiles.map((media, index) => (
          <div className="ct_uploaded_img123 position-relative" key={index}>
            <div className="ct_uploaded_img_w">
              {renderPreview(media, true)}
              <i
                className="fa-solid fa-xmark"
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
