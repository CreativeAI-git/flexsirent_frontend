import CustomSwiper from "../../swiper";
import { useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import NoRecord from "../../other/NoRecord";
import { webPath } from "../../../../user/routes";
import { generateSlug } from "../../../utils/slugs";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const Section3 = ({ propertyList: propPropertyList }) => {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const { lang } = useParams();
  const { propertyList: reduxPropertyList } = useSelector((state) => state?.guest?.booking);
  const propertyList = propPropertyList || reduxPropertyList || [];

  return (
    <section className="ct_py_70 pt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_700 text-center">
              {t("home_section3.title")}
            </h2>
          </div>
        </div>
        <div className="row ct_mt_60">
          <div className="col-md-12">
            {propertyList?.length > 0 ? (
              <div className="swiper mySwiper accomodation-swiper">
                <CustomSwiper
                  data={propertyList || []}
                  swiperProps={{
                    slidesPerView: 4,
                    pagination: false,
                    spaceBetween: 20,
                    loop: true,
                    breakpoints: {
                      0: { slidesPerView: 1 },
                      576: {
                        slidesPerView: 2,
                      },
                      768: { slidesPerView: 3 },

                      1200: { slidesPerView: 4 },
                    },
                  }}
                  renderSlide={(item) => (
                    <a
                      href={`/${lang || "en"}/l/${item?.property_id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`l/${item?.property_id}`);
                      }}
                      className="d-block text-decoration-none text-dark h-100"
                    >
                      <figure
                        className="ct_rent_type_card ct_cursor_pointer h-100"
                      >
                        <div className="ct_rent_type_img">
                          <img loading="lazy"
                            src={
                              item?.propertyImage?.length
                                ? item?.propertyImage[0]?.image
                                : ""
                            }

                            alt={item?.property_title}
                          />
                        </div>
                        <figcaption className="mt-4">
                          <span>
                            {item?.category_id == 1 ? "APARTMENT" : "APARTMENT"}
                          </span>
                          <p className="mb-0 mt-4 ct_para_scroll ct_overlay_text">
                            {item?.property_description || "#N/A"}
                          </p>
                        </figcaption>
                      </figure>
                    </a>
                  )}
                />
              </div>
            ) : (
              <NoRecord />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
