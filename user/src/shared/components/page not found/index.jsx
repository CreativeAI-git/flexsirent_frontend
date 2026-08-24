import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";

const PageNotFound = () => {
  const navigate = useLocalizedNavigate();
  return (
    // <div className="ct_page_not_found_bg">
    //   <div className="ct_page_not_found_section">
    //     <h1 className="ct_page_not_found_error">404</h1>
    //     <div className="ct_page_not_found_page">
    //       Ooops!!! The page you are looking for is not found
    //     </div>
    //     <a
    //       className="back-home"
    //       href="#"
    //       onClick={() => navigate(-1)}
    //     >
    //       Back to previous
    //     </a>
    //   </div>
    // </div>
    <div className="ct_page_not_found_bg">
      <div className="ct_page_not_found_section">
        <h1 className="ct_page_not_found_error">404</h1>
        <div className="ct_page_not_found_page">
          Ooops!!! The page you are looking for is not found
        </div>
        <div>
          <a
            href="#"
            onClick={() => navigate(-1)}
            className="ct_orange_btn"
          >
            Go To Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
