import { useLocation } from "react-router";

const Details = ({ blogData }) => {
  const locationData = useLocation()?.state?.data || {};
  const data = blogData || locationData;
  return (
    <section className="ct_py_70">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <ul className="d-flex align-items-center gap-2 mb-3">
              <li className="text-dark ct_line_h_0 d-flex align-items-center gap-2">
                <img  loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" className="ct_img_40" />
                By Admin
              </li>
              <li className="ct_line_h_0 ">
                <span className="ct_grey_dot bg-dark ct_grey_dot_w_6"></span>
              </li>
              <li className="text-dark ct_line_h_0 ">May 22, 2025</li>
            </ul> */}
            <div dangerouslySetInnerHTML={{ __html: data?.blog_content }} />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
