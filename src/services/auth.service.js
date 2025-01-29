import axiosInstance from "./api";

const saveUserToLocalStorage = (data) => {
    if (data) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
    }
};

const login = (email, password) => {
    return axiosInstance
        .post(
            "/auth/signin",
            { email, password },
            { withCredentials: true})
        .then((response)=> {
            saveUserToLocalStorage(response.data?.data);
            return response.data;
        })
};

const register = (userDetails) => {
    return axiosInstance
        .post(
            "/auth/register",
            userDetails,
            { withCredentials: true})
        .then((response)=> {
            saveUserToLocalStorage(response.data?.data);
            return response.data;
        })
};

const logout = () => {
    localStorage.removeItem("user");
    return axiosInstance
    .post("/auth/signout")
        .then(response => {
            return response.data;
        })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const services = { login, register, logout, getCurrentUser };
export default services;
