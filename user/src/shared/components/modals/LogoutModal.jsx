import { clearAllAuth } from "../../utils/pip";

const LogoutModal = () => {
  return (
    <div
      className="modal fade"
      id="ct_logout_modal_post"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header pb-0 border-0">
            <button
              type="button"
              className="btn-close ct_close"
              data-bs-dismiss="modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="modal-body">
            <div className="ct_delete_post_modal">
              <figure>
                <div className="ct_delete_post_icon text-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_36_4091)">
                      <path
                        d="M24 0C10.7452 0 0 10.7452 0 24V24.036C0 37.2908 10.7092 48 23.964 48H24C37.2548 48 48 37.2908 48 24.036V24C48 10.7452 37.2908 0 24.036 0H24Z"
                        fill="#282828"
                        fill-opacity="0.1"
                      />
                      <path
                        d="M15.6775 33.29H32.321C32.5913 33.29 32.857 33.2198 33.0921 33.0864C33.3272 32.9529 33.5236 32.7608 33.6622 32.5287C33.8008 32.2966 33.8768 32.0325 33.8828 31.7623C33.8889 31.492 33.8246 31.2248 33.6965 30.9868L25.3752 15.5327C24.7849 14.437 23.2136 14.437 22.6233 15.5327L14.302 30.9868C14.1738 31.2248 14.1096 31.492 14.1156 31.7623C14.1216 32.0325 14.1976 32.2966 14.3362 32.5287C14.4748 32.7608 14.6713 32.9529 14.9064 33.0864C15.1415 33.2198 15.4071 33.29 15.6775 33.29Z"
                        stroke="black"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.7189 21.0405L23.9992 26.9976L24.279 21.043C24.2807 21.0049 24.2747 20.9669 24.2612 20.9312C24.2477 20.8956 24.2272 20.8631 24.2007 20.8357C24.1742 20.8082 24.1425 20.7865 24.1073 20.7718C24.0722 20.757 24.0344 20.7496 23.9963 20.75C23.9588 20.7504 23.9219 20.7582 23.8875 20.7731C23.8532 20.788 23.8221 20.8097 23.7963 20.8367C23.7704 20.8638 23.7503 20.8958 23.737 20.9308C23.7237 20.9658 23.7176 21.0031 23.7189 21.0405Z"
                        stroke="black"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 30.8984C23.8069 30.8984 23.618 30.8412 23.4575 30.7339C23.2969 30.6266 23.1717 30.474 23.0978 30.2956C23.0239 30.1171 23.0045 29.9208 23.0422 29.7314C23.0799 29.5419 23.1729 29.3679 23.3095 29.2313C23.446 29.0948 23.62 29.0018 23.8095 28.9641C23.9989 28.9264 24.1953 28.9457 24.3737 29.0196C24.5522 29.0936 24.7047 29.2187 24.812 29.3793C24.9193 29.5399 24.9766 29.7287 24.9766 29.9219C24.9766 30.1809 24.8737 30.4293 24.6905 30.6124C24.5074 30.7956 24.259 30.8984 24 30.8984Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_36_4091">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <figcaption className="mt-4 text-center">
                  <h4 className="ct_fs_18 ct_fw_600">Log Out</h4>
                  <p className="mb-0">
                    Are you sure you want to logout? Once you logout, you will
                    need to login again.
                  </p>
                </figcaption>
              </figure>

              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className="ct_outline_btn ct_h_40 w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <a
                  href="#"
                  className="ct_orange_btn ct_h_40 w-100 text-center"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    clearAllAuth();
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
