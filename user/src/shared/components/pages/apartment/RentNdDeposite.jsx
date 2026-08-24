import { curSym, pipViewDate } from "../../../utils/pip";

const RentNdDeposite = ({ data = {} }) => {
  return (
    <div className="ct_white_bg ct_box_shadow p-4 mt-4 " id="rent-&-deposit">
      <div className="row">
        <div className="col-xl-5 col-lg-6 mb-4 mb-lg-0">
          <div className="d-flex align-items-center gap-3 mb-5 flex-wrap">
            <h4 className="ct_fs_20 ct_fw_600 mb-0">Rent & Deposit</h4>
            <span className="ct_light_orange_badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2126 6.66889C10.8599 6.3161 10.3814 6.1179 9.88247 6.1179C9.38355 6.1179 8.90507 6.3161 8.55227 6.66889C8.19948 7.02168 8.00128 7.50016 8.00128 7.99908C8.00128 8.498 8.19948 8.97648 8.55227 9.32927C8.72696 9.50393 8.93434 9.64256 9.16257 9.73706C9.39081 9.83165 9.63543 9.8803 9.88247 9.8803C10.1295 9.8803 10.3741 9.83165 10.6024 9.73706C10.8306 9.64256 11.0379 9.50393 11.2126 9.32927C11.3873 9.15459 11.5259 8.94721 11.6204 8.71898C11.715 8.49074 11.7637 8.24612 11.7637 7.99908C11.7637 7.75204 11.715 7.50742 11.6204 7.27918C11.5259 7.05095 11.3873 6.84357 11.2126 6.66889ZM4.86286 4.23438V11.7638H14.902V4.23438H4.86286ZM13.6472 9.25398C13.3147 9.25398 12.9947 9.38574 12.7625 9.62421C12.5241 9.8563 12.3923 10.1763 12.3923 10.5089H7.37266C7.37266 10.1763 7.2409 9.8563 7.00247 9.62421C6.77031 9.38574 6.45031 9.25398 6.11776 9.25398V6.74418C6.45031 6.74418 6.77031 6.61242 7.00247 6.37398C7.2409 6.14183 7.37266 5.82183 7.37266 5.48927H12.3923C12.3923 5.82183 12.5241 6.14183 12.7625 6.37398C12.9947 6.61242 13.3147 6.74418 13.6472 6.74418V9.25398ZM3.60795 5.48927H2.35306C2.00795 5.48927 1.7256 5.20692 1.7256 4.86183C1.7256 4.51673 2.00795 4.23438 2.35306 4.23438H3.60795V5.48927ZM3.60795 8.62653H1.7256C1.38051 8.62653 1.09815 8.34418 1.09815 7.99908C1.09815 7.65398 1.38051 7.37163 1.7256 7.37163H3.60795V8.62653ZM3.60795 11.7638H1.09815C0.751801 11.7638 0.470703 11.4814 0.470703 11.1363C0.470703 10.7913 0.751801 10.5089 1.09815 10.5089H3.60795V11.7638Z"
                  fill="#0D0D0D"
                />
              </svg>
              Instant Deposit Refund
            </span>
          </div>
          <div className="ct_rent_deposit_card ct_flex_col_575">
            <div className="ct_rent_deposit_img position-relative">
              <img
                loading="lazy"
                src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"
                alt=""
              />
              <span className="ct_available_tag">Available</span>
            </div>
            <div className="ct_rent_deposit_cnt ct_flex_1 text-white">
              <p className="mb-1">Available From</p>
              <p className="mb-1">{pipViewDate(data?.available_from) || ""}</p>
              <div className="d-flex align-items-start justify-content-between gap-3 mt-3 flex-wrap">
                <div>
                  <h6 className="ct_fs_14 ct_fw_600 mb-1">Rent</h6>
                  <p className="mb-0 ct_fs_14">
                    {curSym}
                    {(
                      data?.monthly_rent -
                      (data?.monthly_rent * (data?.offer_value || 0)) / 100
                    ).toFixed(2)}{" "}
                    /Month
                  </p>
                  {Number(data?.offer_value) > 0 && (
                    <p className="mb-0">
                      <del className=" text-light ct_fs_12">
                        {curSym}
                        {data?.monthly_rent || 0}
                      </del>
                      <span className="ms-2 text-light ct_fs_12">
                        ({data?.offer_value}% OFF)
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <h6 className="ct_fs_14 ct_fw_600 mb-1">Deposit</h6>
                  <p className="mb-0 ct_fs_14">
                    {curSym}
                    {data?.security_deposit || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-lg-6 mb-4 mb-lg-0">
          <div className="ct_light_grey_bg">
            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap pb-4 mb-4 ct_border_btm_1">
              <h5 className="ct_fs_18 ct_fw_600 mb-0">
                Monthly Rent{" "}
                <small>
                  ({data?.monthly_rent_type == 1 ? "per person" : "fixed"})
                </small>
              </h5>
              <h5 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                {curSym}
                {(
                  data?.monthly_rent -
                  (data?.monthly_rent * (data?.offer_value || 0)) / 100
                ).toFixed(2)}{" "}
                {Number(data?.offer_value) > 0 && (
                  <>
                    <del className="ms-2 text-muted ct_fs_16">
                      {curSym}
                      {data?.monthly_rent || 0}
                    </del>
                    <span className="ms-2 ct_orange_text ct_fs_16">
                      {" "}
                      ({data?.offer_value}% OFF)
                    </span>
                  </>
                )}
              </h5>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap pb-4 mb-4 ct_border_btm_1">
              <h5 className="ct_fs_18 ct_fw_600 mb-0">
                Cleaning Fee{" "}
                <small>
                  ({data?.cleaning_fee_type == 1 ? "per person" : "fixed"})
                </small>
              </h5>
              <h5 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                {curSym}
                {data?.cleaning_fee || 0}
              </h5>
            </div>
            <div className=" pb-4 mb-4 ct_border_btm_1">
              <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                <h5 className="ct_fs_18 ct_fw_600 mb-0">Security Deposit</h5>
                <h5 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                  {curSym}
                  {data?.security_deposit || 0}
                </h5>
              </div>
              <p className="ct_fs_14 mt-2 mb-0">
                Fully refundable if vacated in original condition
              </p>
            </div>
            {/* <div className=" pb-4 mb-4 ct_border_btm_1">
              <h5 className="ct_fs_18 ct_fw_600 mb-0">Bills</h5>
              <ul className="mt-3">
                <li className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <p className="mb-0 ct_fs_14">Electricity</p>
                  <p className="mb-0 ct_fs_14">Included</p>
                </li>
                <li className="mt-2 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <p className="mb-0 ct_fs_14">Gas</p>
                  <p className="mb-0 ct_fs_14">Included</p>
                </li>
                <li className="mt-2 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <p className="mb-0 ct_fs_14">Water</p>
                  <p className="mb-0 ct_fs_14">Included</p>
                </li>
                <li className="mt-2 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <p className="mb-0 ct_fs_14">Wifi</p>
                  <p className="mb-0 ct_fs_14">Included</p>
                </li>
              </ul>
            </div> */}
            {/* <div className="">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <h5 className="ct_fs_18 ct_fw_600 mb-0 ct_orange_text">
                  Total Payable Amount
                </h5>
                <h5 className="ct_fs_18 ct_fw_700 mb-0 ct_orange_text ct_white_nowrap">
                 {curSym}{(Number(data?.monthly_rent || 0) + Number(data?.security_deposit || 0)) || 0}
                </h5>
              </div>
              <p className="ct_fs_14 mt-2 mb-0">
                Includes monthly rent, security deposit
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentNdDeposite;
