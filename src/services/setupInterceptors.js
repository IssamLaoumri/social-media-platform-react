import axiosInstance from "./api";
import {csrfToken, logout} from "../slices/auth";

const setup = (store) => {
    const { dispatch } = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/signin" && err.response) {
                // Access Token was expired
                if (err.response.data.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        await axiosInstance.post("/auth/refreshtoken", null, { withCredentials: true });
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        if(_error.response.data.statusCode === 403) dispatch(logout());
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
    // Axios request interceptor (fetch token only for state-changing requests)
    axiosInstance.interceptors.request.use(async (config) => {
        if (["POST", "PUT", "DELETE", "PATCH"].includes(config.method.toUpperCase())) {
            try {
                const tokenRes = await dispatch(csrfToken());
                if(tokenRes?.payload){
                    config.headers["X-XSRF-TOKEN"] = tokenRes.payload;
                }
            }catch (e) {
                console.error("Failed to fetch CSRF token:", e);
            }
        }
        return config;
    });
};

export default setup;