import PanelLayout from "../../../shared/layout/PanelLayout";

const ReservationRequestDetails = () => {
  const user = { name: "Reservation Request Details", role: "host" };

  return (
    <PanelLayout user={user}>
      <div className="col-md-12">
        <div className="ct_white_bg h-auto ct_border_grey_1">
          <div className="ct_px_30_new ">
            <ul className="ct_view_profile_list">
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Guest Name :</p>
                <p className="mb-0">Robert Decosta </p>
              </li>
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Dates :</p>
                <p className="mb-0">Jul 15–18</p>
              </li>
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Change Dates:</p>
                <p className="mb-0">Jul 16–19</p>
              </li>
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Added Guest:</p>
                <p className="mb-0">1 Guest</p>
              </li>
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Cleaning Fee</p>
                <p className="mb-0">€500</p>
              </li>

              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Status :</p>
                <p className="mb-0">
                  <span className="ct_upcoming_clr ct_fw_600">Approved</span>
                </p>
              </li>
              <li className="ct_flex_col_575 d-flex d-sm-grid">
                <p className="mb-0 ct_fw_600">Reason for Change</p>
                <p className="mb-0 ct_para_scroll ct_custom_scroll">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam dicta ipsum harum totam id voluptatibus laborum
                  voluptatem facilis animi, impedit inventore et hic, esse
                  excepturi commodi autem reprehenderit exercitationem illo!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ReservationRequestDetails;
