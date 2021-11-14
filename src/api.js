import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.2.2:5000",
    timeout: 5000,
    headers: {
        'X-Custom-Header': 'foobar',
        "Content-Type": "application/json; charset=UTF-8"
    }
});

export default api;