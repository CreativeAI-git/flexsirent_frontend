import { useSelector } from "react-redux";
import CustomSwiper from "../../swiper";
import { useTranslation } from "react-i18next";

const Testimonials = ({ reviewList: propReviewList }) => {
  const { t } = useTranslation();
  const { reviewList: reduxReviewList } = useSelector(
    (state) => state?.guest?.booking,
  );
  const reviewList = propReviewList || reduxReviewList || [];
  return (
    <section className="ct_testimonial_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_25 ct_fw_600  text-center">
              {t("home_testimonials.title")}
            </h2>
            <CustomSwiper
              data={reviewList || []}
              className="ct_testimonial_slider ct_mt_60"
              swiperProps={{
                slidesPerView: 2,
                spaceBetween: 20,
                loop: true,
                pagination: false,
                navigation: true,
                breakpoints: {
                  0: { slidesPerView: 1 },
                  576: {
                    slidesPerView: 2,
                  },
                  1200: { slidesPerView: 2 },
                },
              }}
              renderSlide={(item) => (

                <div className="ct_testimonial_card">
                  <div className="ct_testimonial_img">
                    <img loading="lazy" src={item.profile_image || "user_profile.png"} alt="client_img" />
                  </div>
                  <div className="ct_testimonial_content">
                    <p className="mb-0 ct_para_scroll">
                      {item.review || "#N/A"}
                    </p>
                    <div className="mt-auto pt-4">
                      <h4 className="ct_fs_16 ct_fw_600">
                        {item.full_name || "#N/A"}
                      </h4>
                      {/* <p className="mb-0 ct_fs_14 ct_orange_text">
                          {item.role || "#N/A"}
                        </p> */}
                    </div>
                  </div>
                  <div className="ct_quote_icon">
                    <img loading="lazy" src="https://app.flexsirent.com/assets/img/quote.png" alt="quote icon" />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;