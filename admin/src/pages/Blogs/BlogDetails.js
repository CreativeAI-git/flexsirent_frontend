import { useLocation } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import ImageWithPreview from "../../components/image preview/imageWithPreview";

const BlogDetails = () => {
  const data = useLocation()?.state?.data;
  return (
    <PanelLayout>
      <SubHeader label="Blog Details" />
      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className="ct_px_30_new pt-4 ct_white_bg">
              <div className="mt-4">
                <h4 className="ct_fs_18 ct_fw_600 mb-3">
                  {" "}
                  {data?.title ?? "#N/A"}
                </h4>
                <div dangerouslySetInnerHTML={{ __html: data?.blog_content }} />

                <div className="owl-carousel owl-theme ct_blog_dtl_slider my-4">
                  <div className="item">
                    <div className="ct_blog_img">
                      <ImageWithPreview
                        image={data?.blogImage ? data?.blogImage[0]?.image : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default BlogDetails;
