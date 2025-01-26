import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const getPublicContent = () => {
    return axios
        .get(API_URL + "/api/v1/resources/public")
        .then(res => {
            if(res.data){
                console.log(res.data);
            }
        })
}

const addPostAdminContent = () => {
    return axios
        .post(API_URL + "/api/v1/resources/admin")
        .then(res => {
            if(res.data){
                console.log(res.data);
            }
        })
}


const services = { getPublicContent, addPostAdminContent};

export default services;