import { getAmenityIcon, getOtherIcon, getSaftyAmenityIcon } from "../../../utils/data";
const Overview = ({ data = {} }) => {
  return (
    <div className="ct_white_bg ct_box_shadow p-4 mt-4 " id="overview">
      {data?.property_description && (
        <>
          <h4 className="ct_fs_20 ct_fw_600 ct_pe_30">About This Property</h4>
          <p className="ct_para_scroll ct_fs_14 mb-0 ct_pe_30">
            {data?.property_description}
          </p>
        </>
      )}
      {data?.amenities_label?.length && (
        <div className="ct_mt_30">
          <h4 className="ct_fs_20 ct_fw_600 ct_pe_30">Ameneties</h4>
          <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_40">
            {data?.amenities_label?.map((item, index) => (
              <li key={index}>
                <img loading="lazy"
                  src={`https://app.flexsirent.com/assets/img/${getAmenityIcon(
                    item?.title
                  )}`}
                  alt={""}
                />
                {item?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {data?.safety_amenities_label?.length && (
        <div className="ct_mt_30">
          <h4 className="ct_fs_20 ct_fw_600 ct_pe_30">Safety Ameneties</h4>

          <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_40">
            {data?.safety_amenities_label?.map((item, index) => (
              <li key={index}>
                <img loading="lazy"
                  src={`https://app.flexsirent.com/assets/img/${getSaftyAmenityIcon(
                    item?.title
                  )}`}
                  alt={""}
                />
                {item?.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="ct_mt_30">
        <h4 className="ct_fs_20 ct_fw_600 ct_pe_30">Other Details</h4>
        <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_40">
          {data?.category_name && (
            <li>

              <img
                loading="lazy"
                className="ct_icon_w_25"
                src={`https://app.flexsirent.com/assets/img/dashbaord-images/${getOtherIcon(
                  data?.category_name,
                )}`}
                alt=""
              />
              {data?.category_name}

            </li>
          )}
          {data?.floor && (
            <li>

              <img
                loading="lazy"
                className="ct_icon_w_25"
                src={`https://app.flexsirent.com/assets/img/dashbaord-images/${getOtherIcon(
                  "floor",
                )}`}
                alt=""
              />
              {data?.floor}

            </li>
          )}

          {data?.ideal_for_label?.length > 0 &&
            data?.ideal_for_label?.map((item, index) => (
              <li key={index}>

                <img
                  loading="lazy"
                  className="ct_icon_w_25"
                  src={`https://app.flexsirent.com/assets/img/dashbaord-images/${getOtherIcon(
                    item?.title,
                  )}`}
                  alt=""
                />
                {item?.title}

              </li>
            ))}

          <li>

            <img
              loading="lazy"
              src="https://app.flexsirent.com/assets/img/dashbaord-images/cil_room.svg"
              alt=""
            />
            {`${data?.bedrooms || 0} Badroom${data?.bedrooms > 1 && "s"}`}

          </li>
          <li>

            <img
              loading="lazy"
              src="https://app.flexsirent.com/assets/img/dashbaord-images/iconoir_bathroom.svg"
              alt=""
            />
            {`${data?.bathrooms || 0} Bathroom${data?.bathrooms > 1 && "s"
              }`}

          </li>
          <li>

            <img
              loading="lazy"
              src="https://app.flexsirent.com/assets/img/dashbaord-images/mingcute_bed-line.svg"
              alt=""
            />
            {`${data?.beds || 0} Bed${data?.beds > 1 && "s"}`}

          </li>
          <li>

            <img
              loading="lazy"
              src="https://app.flexsirent.com/assets/img/dashbaord-images/bx_area.svg"
              alt=""
            />
            {data?.square_foot || 0} {data?.is_m2 ? "m²" : "sqft"}

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
