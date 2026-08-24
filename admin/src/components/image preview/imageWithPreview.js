import ImagePreview from ".";
import { useState } from "react";

const ImageWithPreview = ({
  image,
  data,
  fallback = "./user_profile.png",
  className = data ?? "ct_img_60",
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
        src={image||fallback}
        alt="img"
        onClick={handleClick}
        className={`${className} ct_cursor_pointer`}
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
