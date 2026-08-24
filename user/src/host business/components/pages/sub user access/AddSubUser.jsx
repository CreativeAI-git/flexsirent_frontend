const AddSubUser = () => {
  return (
    <div
      className="modal fade moda-lg"
      id="ct_invite_subuser"
      tabindex="-1"
      aria-labelledby="ct_invite_subuserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5" id="ct_invite_subuserLabel">
              + Add Sub User
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
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">Full Name</label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Guest Name"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">Email </label>
                    <input
                      type="Email"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Email "
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">Assign Role</label>
                    <select className="form-control ct_input ct_input_h_40">
                      <option value="">Select Role</option>
                      <option value="reservation">
                        Reservation Management
                      </option>
                      <option value="cleaning">Cleaning Status Only</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button type="button" className="ct_orange_btn ms-auto">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSubUser
