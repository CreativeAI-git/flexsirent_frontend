import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import RichTextEditor from "../../shared/components/others/RichTextEditor";
import { getPolicyData, updatePolicyData } from "../../redux/actions/authAction";

const PolicyManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, policyData } = useSelector((state) => state.authReducers);

  const tabs = [
    {
      value: "Terms & Condition",
      label: "Terms & Condition",
      id: 1
    },
    {
      value: "Privacy Policy",
      label: "Privacy Policy",
      id: 2
    },
    {
      value: "Cancellation Policy",
      label: "Cancellation Policy",
      id: 3
    },
    {
      value: "Business Rules",
      label: "Business Rules",
      id: 4
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id)

  const [textData, setTextData] = useState(policyData ?? '');


  useEffect(() => { setTextData(policyData) }, [policyData]);

  useEffect(() => {
    dispatch(getPolicyData({ payload: activeTabId }))
  }, [activeTabId]);

  const handleUpdatePolicyData = () => {
    const callback = (response) => {
      if (response.success) {
        dispatch(getPolicyData({ payload: activeTabId }))
      };
    };
    const data = {
      content_type: activeTabId,
      content: textData
    };
    dispatch(updatePolicyData({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  };
  return (
    <PanelLayout>
      <SubHeader label="Policy Management" />
      <div className="ct_white_bg">
        <div className="ct_px_30_new pt-4">
          <div>
            <ul
              className="nav nav-pills mb-3 mt-0 ct_custom_tabs"
              id="pills-tab"
              role="tablist"
            >
              {tabs?.map((tab, index) => (
                <li className="nav-item" role="presentation" key={index}>
                  <button
                    className={`nav-link ${activeTab === tab?.value ? "active" : ""
                      }`}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab?.value)
                      setActiveTabId(tab?.id)
                    }}
                  >
                    {tab?.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content pt-4" id="pills-tabContent">
              <div
                className="tab-pane fade active show"
                id="pills-User"
                role="tabpanel"
                aria-labelledby="pills-User-tab"
              >
                <form>
                  <div className="form-group mb-4">
                    <label className="ct_fw_600 mb-2">{activeTab}</label>
                    <RichTextEditor
                    value={textData}
                      onChange={(data) =>
                        setTextData(data)
                      }
                    />
                  </div>
                  <div>
                    <button className="ct_orange_btn ms-auto" type="button" onClick={handleUpdatePolicyData}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout >
  );
};

export default PolicyManagement;
