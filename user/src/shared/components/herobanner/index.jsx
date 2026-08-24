import { useLocation } from "react-router";

const HeroBanner = ({ title, breadcrumb, data = {} }) => {
  const { pathname } = useLocation();
  return (
    <section
      className="ct_inner_blog_banner_bg"
      style={{
        backgroundImage: `url(${
          data?.blogImage ? data?.blogImage[0]?.image : ""
        })`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_700 text-white">{title}</h2>
            <ul className="ct_bread_crumb mt-3">
              {breadcrumb.map((item, index) => (
                <li key={index} className={item.isCurrent ? "text-white" : ""}>
                  {item.link ? (
                    <a href={item.link} className="ct_orange_text">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                  {index !== breadcrumb.length - 1 && (
                    <span className="text-white ms-3">/</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
