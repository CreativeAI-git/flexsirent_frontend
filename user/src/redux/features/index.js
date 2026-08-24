import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../shared/routes/apiURLs";
import { clearAuth, getActivePanel, getCurrentPanel, getToken } from "../../shared/utils/pip";

export const API_REQUEST = async (props) => {
  const {
    url,
    method,
    data,
    headers,
    params,
    isErrorToast = true,
    isSuccessToast = true,
    loggedInRole=""
  } = props;

  const token = getToken(loggedInRole ? loggedInRole : getActivePanel());
//   getActivePanel()
  const requestOptions = {
    url: BASE_URL + url,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    params: method === "GET" ? params : undefined,
    data: method !== "GET" ? data : undefined,
  };
  try {
    const response = await axios(requestOptions);
    if (isSuccessToast && method !== "GET") {
      const isSuccess =
        response?.data?.success ?? response?.data?.status ?? false;
      const message = response?.data?.message;

      if (isSuccess) {
        if (typeof window !== "undefined") toast.success(message || "Operation successful");
      } else {
        if (typeof window !== "undefined") toast.error(message || "Something went wrong");
      }
    }

    return response?.data;
  } catch (error) {
    if (isErrorToast) {
      if (error.response) {
        if (error?.response?.data?.status === 401) {
          if (getCurrentPanel() != "guest") {
            if (typeof window !== "undefined") {
              toast.error(error?.response?.data?.message);
              clearAuth(getCurrentPanel());
              window.location.href = "/";
            }
          }
          return;
        }
        if (typeof window !== "undefined") toast.error(error?.response?.data?.message);
      } else if (error.request) {
        if (typeof window !== "undefined") toast.error("No response received from server");
      } else {
        if (typeof window !== "undefined") toast.error("Error:", error.message);
      }
    }
    throw error.response;
  }
};
