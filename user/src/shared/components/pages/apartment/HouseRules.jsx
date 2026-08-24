import { getHouseRulesIcon } from "../../../utils/data";

const HouseRules = ({ data = {} }) => {
  return (
    <div className="ct_white_bg ct_box_shadow p-4 mt-4" id="house-rules">
      <h4 className="ct_fs_20 ct_fw_600">House Rules</h4>
      <div className="ct_mt_30">
        <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_30">
          {data?.house_rules_label?.map((item, index) => (
            <li key={index}>
              <img  loading="lazy"
                src={`https://app.flexsirent.com/assets/img/${getHouseRulesIcon(
                  item?.title
                )}`}
                alt={""}
              />
              {item?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HouseRules;
