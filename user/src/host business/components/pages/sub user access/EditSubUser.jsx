import React from 'react'

const EditSubUser = () => {
  return (
    <div
      className="modal fade moda-lg"
      id="ct_edit_invite_subuser"
      tabindex="-1"
      aria-labelledby="ct_edit_invite_subuserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5" id="ct_edit_invite_subuserLabel">
              Edit Sub User
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pb-4">
            <form action="">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">Full Name</label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Guest Name"
                      value="John Doe"
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
                      value="johndoe@gmail.com"
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

              {/* <!-- <div id="customPermissions" >
                        <label className="mb-2 ct_fw_600">Custom Access</label>
                        <div className="form-check ct_custom_check">
                            <input className="form-check-input " type="checkbox" value="reservations" id="perm1">
                            <label className="form-check-label ct_white_nowrap" for="perm1">Manage Reservations</label>
                        </div>
                        <div className="form-check ct_custom_check">
                            <input className="form-check-input " type="checkbox" value="cleaning" id="perm2">
                            <label className="form-check-label ct_white_nowrap" for="perm2">View Cleaning Status</label>
                        </div>
                        <div className="form-check ct_custom_check">
                            <input className="form-check-input " type="checkbox" value="pricing" id="perm3">
                            <label className="form-check-label ct_white_nowrap" for="perm3">Edit Pricing</label>
                        </div>
                        </div> --> */}

              <div>
                <button type="button" className="ct_orange_btn ms-auto">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSubUser
