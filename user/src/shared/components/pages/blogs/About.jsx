import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { generateSlug } from "../../../utils/slugs";
import { useSelector } from "react-redux";

const About = ({ blogList: propBlogList }) => {
  const nvaigate = useLocalizedNavigate();
  const navigate = useLocalizedNavigate();
  const { blogList: reduxBlogList } = useSelector((state) => state?.guest?.auth);
  const blogList = propBlogList || reduxBlogList || [];
  const [firstBlog, ...otherBlogs] = blogList;

  return (
    <section className="py-4 ">
      <div className="container">
        <div className="bg-white p-3 ct_custom_box_shodow ct_border_radius_20">
          <div className="row align-items-center">
            {/* <div className="col-md-12">
            <div className="ct_blog_main_card">
              <div className="ct_main_blog_inner_card">
             
                <h2 className="ct_fs_35 ct_fw_600 mb-3 ct_minimise_cnt ct_white_space_normal">
                  {firstBlog?.title || "#N/A"}
                </h2>
                <p
                  className="mb-0 ct_para_scroll ct_minimise_cnt"
                  dangerouslySetInnerHTML={{ __html: firstBlog?.blog_content }}
                >
              
                </p>
                <div className="mt-5 text-end">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(webPath?.BlogDetails, {
                        state: { data: firstBlog },
                      });
                    }}
                    className="ct_read_more_link"
                  >
                    Read More
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
              <div
                className="ct_main_blog_right_img"
                style={{
                  backgroundImage: `URL(${firstBlog?.blogImage ? firstBlog?.blogImage[0]?.image : ""})`,
                }}
              ></div>
            </div>
          </div> */}



            <div className="col-lg-5 col-md-6 mb-md-0 mb-3">
              <img src={firstBlog?.blogImage ? firstBlog?.blogImage[0]?.image : ""} className="w-100 object-fit-cover ct_border_radius_10" style={{
                height: "350px"
              }} />



            </div>

            <div className="col-lg-7 col-md-6 mb-md-0 mb-3">
              <div className="ps-lg-4">

                <h2 className="ct_fs_28 ct_fw_700 ct_mb_12 ct_minimise_cnt ct_white_space_normal ct_dark_blue_text">
                  {firstBlog?.title || "#N/A"}
                </h2>
                <p
                  className="mb-0 ct_fs_15 ct_para_scroll ct_minimise_cnt ct_dark_blue_text"
                  dangerouslySetInnerHTML={{ __html: firstBlog?.blog_content }}
                >

                </p>
                <div className="mt-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`blog-details/${generateSlug(firstBlog?.title, firstBlog?.blog_id)}`);
                    }}
                    className="ct_read_more_link ct_fw_500 ct_fs_14 ct_dark_blue_text"
                  >
                    <i className="fa-solid fa-arrow-right me-2 ct_orange_text"></i>
                    Read More

                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
