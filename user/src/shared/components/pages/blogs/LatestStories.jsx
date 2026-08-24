import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { generateSlug } from "../../../utils/slugs";
import { useSelector } from "react-redux";
import NoRecord from "../../other/NoRecord";

const LatestStories = ({ blogList: propBlogList }) => {
  const navigate = useLocalizedNavigate();
  const { blogList: reduxBlogList } = useSelector((state) => state?.guest?.auth);
  const blogList = propBlogList || reduxBlogList || [];
  const [firstBlog, ...otherBlogs] = blogList;
  return (
    <section className="ct_py_70 pt-0">
      <div className="container">
        {/* comment by sakshi */}
        {/* <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_600 mb-5">Latest Stories</h2>
          </div>
        </div> */}
        {/*  end  */}
        {otherBlogs?.length > 0 ? <div className="row">
          {otherBlogs?.map((item, index) => (
            // <div className="col-lg-4 col-md-6 mb-4" key={index}>

            //   <figure className="ct_blog_card h-100 d-grid">
            //     <div className="ct_blog_img">
            //       <img  loading="lazy" src={item?.blogImage ? item?.blogImage[0]?.image :""} alt={item?.title} />
            //     </div>
            //     <figcaption>
            //       <h2 className="ct_fs_18 ct_overlay_text">
            //         {item?.title || "#N/A"}
            //       </h2>

            //       <p className="ct_minimise_cnt ct_white_space_normal mb-0 ct_text_op_6" style={{height:"75px"}} dangerouslySetInnerHTML={{__html:item?.blog_content}}>

            //       </p>
            //       <div className="mt-3">
            //         <a
            //           href="#"
            //           onClick={(e) => {
            //             e.preventDefault();
            //             navigate(webPath?.BlogDetails,{state:{data:item}});
            //           }}
            //           className="ct_orange_link ct_text_upercase"
            //         >
            //           Read More
            //           <i className="fa-solid fa-arrow-right ms-2"></i>
            //         </a>
            //       </div>
            //     </figcaption>
            //   </figure>
            // </div>



            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="bg-white p-2 ct_custom_box_shodow ct_border_radius_20 h-100">

                <a
                  href="#"
                  className="ct_blue_text"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`blog-details/${generateSlug(item?.title, item?.blog_id)}`);
                  }}

                >



                  <figure className="ct_blog_card ">
                    <div className="ct_blog_img">
                      <img loading="lazy" src={item?.blogImage ? item?.blogImage[0]?.image : ""} alt={item?.title} />
                    </div>
                    <figcaption>
                      <div className="ct_fs_16 ct_fw_500 ct_minimise_cnt ct_white_space_normal mb-0">
                        {item?.title || "#N/A"}
                      </div>

                      {/* <p className="ct_minimise_cnt ct_white_space_normal mb-0 ct_text_op_6" style={{height:"75px"}} dangerouslySetInnerHTML={{__html:item?.blog_content}}>
                  
                  </p>
                  <div className="mt-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(webPath?.BlogDetails,{state:{data:item}});
                      }}
                      className="ct_orange_link ct_text_upercase"
                    >
                      Read More
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div> */}
                    </figcaption>
                  </figure>
                </a>
              </div>
            </div>
          ))}
        </div>
          :
          <NoRecord />
        }
      </div>
    </section>
  );
};

export default LatestStories;
