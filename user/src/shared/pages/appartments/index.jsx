import { curSym } from "../../utils/pip";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import WebFooter from "../../layout/WebFooter";
import WebHeader from "../../layout/WebHeader";
import { webPath } from "../../../user/routes";

const Appartments = () => {
  const navigate = useLocalizedNavigate()
  const apartments = [
    {
      id: 1,
      title: "New Apartment Nice View",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "One-bedroom apartment",
      bed: 3,
      bath: 2,
      area: 3450,
      price: "34,900",
      link: "apartment-detail.html",
    },
    {
      id: 2,
      title: "Modern Apartment with Garden",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "Two-bedroom apartment",
      bed: 2,
      bath: 1,
      area: 2800,
      price: "29,500",
      link: "apartment-detail.html",
    },
    {
      id: 3,
      title: "Luxury City View Apartment",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "Three-bedroom apartment",
      bed: 4,
      bath: 3,
      area: 4100,
      price: "49,000",
      link: "apartment-detail.html",
    },
    {
      id: 1,
      title: "New Apartment Nice View",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "One-bedroom apartment",
      bed: 3,
      bath: 2,
      area: 3450,
      price: "34,900",
      link: "apartment-detail.html",
    },
    {
      id: 2,
      title: "Modern Apartment with Garden",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "Two-bedroom apartment",
      bed: 2,
      bath: 1,
      area: 2800,
      price: "29,500",
      link: "apartment-detail.html",
    },
    {
      id: 3,
      title: "Luxury City View Apartment",
      image: "https://app.flexsirent.com/assets/img/apartments/aprtment_img_1.jpg",
      type: "Three-bedroom apartment",
      bed: 4,
      bath: 3,
      area: 4100,
      price: "49,000",
      link: "apartment-detail.html",
    },
  ];

  return (
    <>
      <WebHeader />
      <section className="ct_inner_banner_bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="ct_fs_35 ct_fw_700">Apartments</h2>
              <p className="mb-0">
                Comfortable, fully furnished apartments perfect for
                international students and digital nomads looking for a home
                away from home.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 position-relative">
        <div className="container">
          <div className="row ">
            <div className="col-md-12">
              <div>
                <ul className="d-flex align-items-center gap-3 flex-wrap  mb-4 ct_flex_col_767 ct_multifilter_main">
                  <li className="ct_w_100_767">
                    <select className="form-control ct_input ct_input_h_50 ct_w_100_767 w-auto">
                      <option value="">Localities</option>
                    </select>
                  </li>
                  <li className="ct_w_100_767">
                    <select className="form-control ct_input ct_input_h_50 ct_w_100_767">
                      <option value="">Sort By</option>
                      <option value="">Oldest</option>
                      <option value="">Newest</option>
                    </select>
                  </li>
                  <li className="ct_custom_drop_mega ct_w_100_767">
                    <a
                      href="#"
                      id="Amenities"
                      className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_575  d-flex align-items-center gap-1 justify-content-between"
                    >
                      Amenities
                      <i className="fa-solid fa-angle-down ms-1"></i>
                    </a>
                    <ul
                      className="ct_custom_drop_mega_menus"
                      id="ct_Amenities_drop"
                    >
                      <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                        <div className="d-flex align-items-center gap-2 justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Dishwasher
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Washing Machine
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">24</p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Air Conditioning
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            994
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              TV / Streaming Access
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Pet Friendly
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Weekly Cleaning
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            224
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Balcony
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            224
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Equipped Kitchen
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            224
                          </p>
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="ct_custom_drop_mega ct_w_100_767">
                    <a
                      href="#"
                      id="price_range"
                      className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_575  d-flex align-items-center  gap-1 justify-content-between"
                    >
                      Price Range
                      <i className="fa-solid fa-angle-down ms-1"></i>
                    </a>
                    <ul
                      className="ct_custom_drop_mega_menus"
                      id="ct_price_range_drop"
                    >
                      <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                        <div className="d-flex align-items-center gap-2 justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Low Budget
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14 ct_white_nowrap">
                            {curSym}5,000 - {curSym}10,000
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Medium Budget
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14 ct_white_nowrap">
                            {curSym}5,000 - {curSym}10,000
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              High Budget
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14 ct_white_nowrap">
                            {curSym}5,000 Up
                          </p>
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="ct_custom_drop_mega ct_w_100_767">
                    <a
                      href="#"
                      id="filter_price"
                      className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                    >
                      Filter by Price
                      <i className="fa-solid fa-angle-down ms-1"></i>
                    </a>
                    <ul
                      className="ct_custom_drop_mega_menus"
                      id="ct_filter_price_drop"
                    >
                      <div className="ct_multirange_wrapper">
                        {/* <!-- <h4 className="ct_fs_20 ct_fw_600 mb-0"> Filter by Price</h4> --> */}
                        <div className="ct_price-input">
                          <div className="ct_price_field">
                            <span className="d-block mb-2 ct_fw_600">Min ({curSym})</span>
                            <input
                              type="number"
                              className="input-min form-control ct_input_ct_input_h_50"
                              value="2500"
                            />
                          </div>
                          <div className="separator">-</div>
                          <div className="ct_price_field">
                            <span className="d-block mb-2 ct_fw_600">Max ({curSym})</span>
                            <input
                              type="number"
                              className="input-max form-control ct_input_ct_input_h_50"
                              value="7500"
                            />
                          </div>
                        </div>
                        <div className="ct_range_slider1">
                          <div className="ct_range_progress"></div>
                        </div>
                        <div className="range-input">
                          <input
                            type="range"
                            className="range-min"
                            min="0"
                            max="10000"
                            value="2500"
                            step="100"
                          />
                          <input
                            type="range"
                            className="range-max"
                            min="0"
                            max="10000"
                            value="7500"
                            step="100"
                          />
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="ct_custom_drop_mega ct_w_100_767">
                    <a
                      href="#"
                      id="bed_bath"
                      className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                    >
                      Bed/Bath
                      <i className="fa-solid fa-angle-down ms-1"></i>
                    </a>
                    <ul className="ct_custom_drop_mega_menus" id="ct_bed_bath_drop">
                      <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                        <div className="d-flex align-items-center gap-2 justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Single
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2  ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Double
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2  ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              Triple
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2  ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              4+
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                      </div>
                    </ul>
                  </li>
                  <li className="ct_custom_drop_mega ct_w_100_767">
                    <a
                      href="#"
                      id="bhk"
                      className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                    >
                      BHK
                      <i className="fa-solid fa-angle-down ms-1"></i>
                    </a>
                    <ul className="ct_custom_drop_mega_menus" id="ct_bhk_drop">
                      <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                        <div className="d-flex align-items-center gap-2 justify-content-between ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              1 BHK
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              2 BHK
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              3 BHK
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              4 BHK
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-2 justify-content-between mt-2 ">
                          <div className="d-flex align-items-center gap-1">
                            <div className="form-check ct_custom_check2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                            </div>
                            <label
                              for=""
                              className="ct_fs_14 ct_fw_500 ct_text_op_6"
                            >
                              4+ BHK
                            </label>
                          </div>
                          <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                            3,924
                          </p>
                        </div>
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <div className=" position-relative">
                  <input
                    type="search"
                    className="form-control ct_input_h_50 ct_pe_60"
                    placeholder="Search by Location"
                  />
                  <div className="ct_search_bg_icon ct_show_eye">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
                <div className="mt-4 row">
                  {apartments.map((item, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                      <figure className="ct_apartmen_card ct_apartmen_card_bg">
                        <div className="ct_aprtment_img">
                          <img loading="lazy"
                            src={item?.image || ""}
                            alt=""
                            className="ct_img_h_280 ct_border_radius_10"
                          />
                          <div className="ct_like_icon">
                            <i className="fa-regular fa-heart"></i>
                          </div>
                        </div>
                        <figcaption className="mt-4">
                          <h4 className="ct_fs_16 ct_fw_600 mb-2 ct_overlay_text w-100">
                            {item?.title || "#N/A"}
                          </h4>
                          <p className="ct_fs_14 mb-0">
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.05534 0.5C6.21534 0.5 5.43756 0.71 4.72201 1.13C4.00645 1.55 3.43867 2.11778 3.01867 2.83333C2.59867 3.54889 2.38867 4.31111 2.38867 5.12C2.38867 5.92889 2.57534 6.69111 2.94867 7.40667L6.82201 14.36C6.85312 14.4533 6.93089 14.5 7.05534 14.5C7.17978 14.5 7.25756 14.4533 7.28867 14.36L11.162 7.36C11.5353 6.67556 11.722 5.92889 11.722 5.12C11.722 4.31111 11.512 3.54889 11.092 2.83333C10.672 2.11778 10.1042 1.55 9.38867 1.13C8.67312 0.71 7.89534 0.5 7.05534 0.5ZM7.05534 7.5C6.40201 7.5 5.84978 7.27444 5.39867 6.82333C4.94756 6.37222 4.72201 5.82 4.72201 5.16667C4.72201 4.51333 4.94756 3.96111 5.39867 3.51C5.84978 3.05889 6.40201 2.83333 7.05534 2.83333C7.70867 2.83333 8.26089 3.05889 8.71201 3.51C9.16312 3.96111 9.38867 4.51333 9.38867 5.16667C9.38867 5.82 9.16312 6.37222 8.71201 6.82333C8.26089 7.27444 7.70867 7.5 7.05534 7.5Z"
                                fill="#FF8000"
                              />
                            </svg>
                            {item?.type || "#N/A"}
                          </p>
                          <ul className="d-flex align-items-center gap-2 flex-wrap mt-2">
                            <li>
                              <p className="ct_fs_14 mb-0 ct_text_op_6">
                                <span className="ct_fw_700">{item?.bed || 0}</span>{' '}
                                Bed
                              </p>
                            </li>
                            <li>
                              <p className="ct_fs_14 mb-0 ct_text_op_6">
                                <span className="ct_fw_700">{item?.bath || 0}</span>{' '}
                                Bath
                              </p>
                            </li>
                            <li>
                              <p className="ct_fs_14 mb-0 ct_text_op_6">
                                <span className="ct_fw_700">{item?.area || 0}</span>{" "}
                                Square Ft
                              </p>
                            </li>
                          </ul>
                          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mt-4 ct_border_top_1 pt-3">
                            <h5 className="ct_fs_16  mb-0">
                              <span className="ct_fw_700">
                                {curSym}
                                {item?.price || 0}
                              </span>
                              /Month
                            </h5>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(webPath.ApartmentDetails);
                              }}
                              className="ct_fs_16 ct_fw_600 mb-0 ct_orange_text"
                            >
                              View details
                            </a>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WebFooter />
    </>
  );
};

export default Appartments;
