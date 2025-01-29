import axiosInstance from "./api";

const getPublicContent = () => {
    return axiosInstance.get("/resources/public", { withCredentials: true});
};

const getUserBoard = () => {
    return axiosInstance.get("/resources/user", { withCredentials: true});
};

const getModeratorBoard = () => {
    return axiosInstance.get("/resources/mod", { withCredentials: true});
};

const getAdminBoard = () => {
    return axiosInstance.get("/resources/admin", { withCredentials: true});
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
}

export default UserService;