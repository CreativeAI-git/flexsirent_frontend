const ViewProfile = () => {
  return (
    <div
      className="modal fade"
      id="ct_view_user"
      tabindex="-1"
      aria-labelledby="ct_view_userLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content py-4">
          <div className="modal-header border-0 pt-0">
            <h1 className="modal-title ct_fs_20 ct_fw_600" id="ct_view_userLabel">
              View User Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="ct_profile_img mb-4">
                <img loading="lazy" src="../assets/img/user_4.jpg" alt="" />
              </div>
              <div className="form-group mb-4">
                <label className="mb-2 ct_fw_600">Full Name</label>
                <input
                  type="text"
                  className="form-control ct_input ct_input_border_1 ct_input_h_50"
                  readonly
                  placeholder="Full Name"
                  value="Evon Grills"
                />
              </div>
              <div className="form-group mb-4">
                <label className="mb-2 ct_fw_600">Email </label>
                <input
                  type="email"
                  className="form-control ct_input ct_input_border_1 ct_input_h_50"
                  readonly
                  value="EvonGrills2025@gmail.com"
                  placeholder="Email "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ViewProfile
