import { useSelector } from "react-redux";

const ContentManagement = ({ content }) => {
  const reduxPolicyData = useSelector((state) => state.guest.auth.policyData);
  const dataToRender = content !== undefined ? content : reduxPolicyData;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div dangerouslySetInnerHTML={{ __html: dataToRender }}></div>
        </div>
      </div>
    </section>
  );
};

export default ContentManagement;
