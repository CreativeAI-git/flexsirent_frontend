import { useState } from "react";
import { languageOptions } from "../../utils/language_translations";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { Modal } from "antd";


const LanguageModal = ({ isViewModal, setIsViewModal }) => {
  const navigate = useLocalizedNavigate();
  const location = useLocation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    const pathParts = location.pathname.split("/");
    pathParts[1] = newLang;
    navigate(pathParts.join("/") + location.search);
    setIsViewModal(false);
  };

  const SUPPORTED_LOCALES = [
    "en", "es", "sv", "fr", "de", "it", "nl", "no", "da", "fi", "pt", "pl",
    "tr", "ru", "zh", "ja", "ko", "ar", "hi", "el", "he", "cs"
  ];
  const filteredOptions = languageOptions?.filter((opt) =>
    SUPPORTED_LOCALES.includes(opt.value)
  ) || [];

  return (
    <Modal
      // title="We Create Listing For You"
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content ct_border_radius_30 ct_p_35 py-4">
          <div className="modal-header border-0 p-0">
            <div className="pt-3">
              <h1 className="modal-title mb-1 ct_font_poppins ct_fs_18 ct_fw_500 ct_dark_blue_text " id="staticBackdropLabel"> Select your language</h1>
              <p className="ct_fs_14 ct_fw_400 ct_text_707070 mb-0">You can change it at any time. The website will remember your choice on this device.</p>
            </div>
          </div>
          <div className="modal-body px-0">
            <div>
              <h4 className="ct_fs_14 ct_fw_400 ct_dark_blue_text ct_mb_15 ct_font_poppins text-uppercase">Recommended for you</h4>
              <div className="row">
                {
                  filteredOptions.map((option) => (
                    <div className="col-lg-3  col-6 mb-3 ct_cursor_pointer" key={option?.value} onClick={() => handleLanguageChange({ target: { value: option?.value } })}>
                      <div className="language-box">
                        {/* <img src={option?.img} alt={option?.label} /> */}
                        <span className="ct_fs_16_resp_12 ct_fw_400 ct_text_707070 notranslate" translate="no">
                          {option?.label}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LanguageModal;