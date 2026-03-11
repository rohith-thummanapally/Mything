import axios from "axios";
import { logoutThunk } from "../redux/authSlice";

let injectedStore;
export const injectStore = (store) => {
    injectedStore = store;
};
// Create an Axios instance to attach global interceptors
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL
});
// Add a global response interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code within 2xx triggers this
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log('401 Unauthorized globally intercepted. Logging out user.');
            console.log(error);
            if (injectedStore) {
                injectedStore.dispatch(logoutThunk());
            } else {
                console.warn('Redux store is not injected into API interceptor');
            }
        }

        // Return the error so the individual API call can also process it if needed
        return Promise.reject(error);
    }
);

const buildQueryString = params => {
    if (!params) return '';
    const query = Object.entries(params)
        .filter(([key, value]) => value != null) // filter out null or undefined values
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&');
    return query ? `?${query}` : '';
};

export const callapi = async (url, method, body) => {
    let headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('JWTToken')
    };
    let response;

    try {
        if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
            let query = buildQueryString(body);
            response = await api[method.toLowerCase()](url + query, {
                headers: headers
            });
        } else {
            response = await api[method.toLowerCase()](url, body, {
                headers: headers
            });
        }

        let result = response.data;

        if (result['status'] === 'success') {
            return result;
        } else {
            return result;
        }
    } catch (err) {
        // Safe catch block for local API calls, since Axios throws on 400+ statuses
        console.log('Caught Error softly in callapi:', err);

        // Return exactly what the backend sends for errors if available (like the {status: "error"} json payload)
        if (err.response && err.response.data) {
            return err.response.data;
        }

        // Fallback network error
        return { success: false, status: 'error', msg: 'Network or API Call Failed', data: {} };
    }
}