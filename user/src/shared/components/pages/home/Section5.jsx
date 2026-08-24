import CustomSwiper from "../../swiper";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { apartmentData } from "../../../utils/pip";
import ApartmentCard from "../../cards/ApartmentCard";
import { generateSlug } from "../../../utils/slugs";
import { useSelector } from "react-redux";
import NoRecord from "../../other/NoRecord";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const Section5 = ({ propertyList: propPropertyList }) => {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  const { lang } = useParams();
  const { propertyList: reduxPropertyList } = useSelector((state) => state?.guest?.booking);
  const propertyList = propPropertyList || reduxPropertyList || [];

  return (
    <section className="ct_py_70">
      <div className=" container-fluid ">
        <div className="row align-items-center">
          <div className="col-xl-5 mb-4 mb-xl-0">
            <div className="ct_px_100">
              <h2 className="ct_fs_35  ct_fw_700 mb-2">
                {t("home_section5.title")}
              </h2>
              <p className="mb-0 ct_para_scroll">
                {t("home_section5.subtitle")}
              </p>
            </div>
          </div>
          <div className="col-xl-7">
            <div className="ps-sm-5 px-3" style={{ overflowX: "hidden" }}>
              <div className="swiper ct_apartment_slider">
                {propertyList?.length > 0 ? (
                  <div className="swiper-wrapper">
                    <CustomSwiper
                      data={propertyList || []}
                      swiperProps={{
                        slidesPerView: 2,
                        spaceBetween: 20,
                        loop: true,
                        pagination: false,
                        breakpoints: {
                          0: { slidesPerView: 1 },
                          576: {
                            slidesPerView: apartmentData?.length > 1 ? 2 : 1,
                          },
                          768: {
                            slidesPerView: apartmentData?.length > 2 ? 3 : 1,
                          },

                          1200: {
                            slidesPerView: apartmentData?.length > 2 ? 2 : 1,
                          },
                        },
                      }}
                      renderSlide={(item) => (
                        <ApartmentCard
                          item={item}
                          href={`/${lang || "en"}/l/${item?.property_id}`}
                          onClick={() => {
                            navigate(`l/${item?.property_id}`);
                          }}
                        />
                      )}
                    />
                  </div>
                ) : (
                  <NoRecord />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
