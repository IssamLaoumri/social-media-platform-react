import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;