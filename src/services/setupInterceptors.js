import axiosInstance from "./api";

const setup = () => {
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
                        const res = await axiosInstance.post("/auth/refreshtoken", null, { withCredentials: true });
                        console.log(res)
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;