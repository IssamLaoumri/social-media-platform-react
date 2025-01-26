import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const HEADERS = {
    'Content-Type': 'application/json',
};

const saveUserToLocalStorage = (data) => {
    if (data) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
    }
};

const login = (email, password) => {
    return axios
        .post(
            `${API_URL}/api/v1/auth/signin`,
            { email, password },
            { headers: HEADERS })
        .then((response)=> {
            saveUserToLocalStorage(response.data?.data);
            return response.data;
        })
};

const register = (userDetails) => {
    return axios
        .post(
            `${API_URL}/api/v1/auth/register`,
            userDetails,
            { headers: HEADERS })
        .then((response)=> {
            saveUserToLocalStorage(response.data?.data);
            return response.data;
        })
};

const logout = () => {
    localStorage.removeItem("user");
    return axios
    .post(API_URL + "/api/v1/auth/signout")
        .then(response => {
            return response.data;
        })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const services = { login, register, logout, getCurrentUser };
export default services;
