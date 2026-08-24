import React, { useState } from "react";
import ImagePreview from ".";

const ImageWithPreview = ({
  image,
  fallback = "https://app.flexsirent.com/admin/assets/img/user.png",
  className = "ct_img_60",
  isPreview = true
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    if (!isPreview) return
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <img  loading="lazy"
        src={image || fallback}
        // alt="preview"
        onClick={handleClick}
        className={className}
      />
      {isModalVisible && (
        <ImagePreview
          handleModalClose={handleModalClose}
          isModalVisible={isModalVisible}
          imgsrc={image}
        />
      )}
    </>
  );
};

export default ImageWithPreview;
