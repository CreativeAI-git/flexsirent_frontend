import { curSym } from "../../utils/pip";

const StatCards = ({ data = [] }) => {
  return (
    <div className="row">
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-3"
          >
            <div className="ct_dash_card">
              <p className="ct_text_clr_6B707C mb-2 ct_fw_600">{item?.label}</p>
              <h4 className="ct_fs_28 ct_fw_600 mb-0">
                {item?.isSym && curSym}
                {item?.value}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
