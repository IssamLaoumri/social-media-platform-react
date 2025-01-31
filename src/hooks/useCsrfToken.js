import { useState, useEffect } from "react";
import axiosInstance from "../services/api";
const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        axiosInstance.get("auth/csrf-token", { withCredentials: true })
            .then(response => {
                setCsrfToken(response.data.token);
            })
            .catch(error => {
                console.error("Failed to fetch CSRF token:", error);
            });
    }, []);

    return csrfToken;
};

export default useCsrfToken;
