import React from 'react'

const CheckInInstruction = () => {
  return (
    <div
      className="modal fade"
      id="ct_send_instruction"
      tabindex="-1"
      aria-labelledby="ct_send_instructionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5" id="ct_send_instructionLabel">
              Send Check-In Instructions
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
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">
                      {" "}
                      Guest Name
                    </label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Guest Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">
                      {" "}
                      Property Name
                    </label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Property Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">
                      Smart Lock Code{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control ct_input ct_input_h_40"
                      placeholder="Smart Lock Code"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2">
                      {" "}
                      Check-in Date/time
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control ct_input ct_input_h_40"
                      placeholder=" Guest Name"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <label for="" className="mb-2">
                  {" "}
                  Location
                </label>
                <textarea
                  className="form-control ct_input h-auto"
                  rows="3"
                ></textarea>
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

export default CheckInInstruction
