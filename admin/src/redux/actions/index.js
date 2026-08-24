import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../routes/BackendRouts";
import { clearAuth, getToken } from "../../utills/pip";
import { pageRoutes } from "../../routes/PageRoutes";

export const API_REQUEST = async (props) => {
    const {
        url,
        method,
        data,
        headers,
        params,
        isErrorToast = true,
        isSuccessToast = true,
    } = props;

    const token = getToken('admin');
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
        // if (isSuccessToast) {
        //   if (method !== "GET" && response?.data?.success === true) {
        //     toast.success(response?.data?.message);
        //   } else if (response?.data?.success === false && method !== "GET") {
        //     toast.error(response?.data?.message);
        //   }
        // };
        if (isSuccessToast && method !== "GET") {
            const isSuccess =
                response?.data?.success ?? response?.data?.status ?? false;
            const message = response?.data?.message;

            if (isSuccess) {
                toast.success(message || "Operation successful",20000);
            } else {
                toast.error(message || "Something went wrong");
            }
        };
        return response?.data;
    } catch (error) {
        if (isErrorToast) {
            if (error.response) {
                if (error?.response?.data?.status === 401) {
                    toast.error(error?.response?.data?.message);
                    clearAuth('admin');
                    window.location.href = `/admin${pageRoutes.login}`;
                    return;
                }
                toast.error(error?.response?.data?.message);
            } else if (error.request) {
                toast.error("No response received from server");
            } else {
                toast.error("Error:", error.message);
            }
        }
        throw error.response;
    }
};
