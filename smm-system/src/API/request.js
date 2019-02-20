import axios from 'axios';
// 引入qs
import qs from 'qs';
axios.defaults.baseURL = 'http://192.168.43.164:5555';

axios.interceptors.request.use((config) => {

    const token = window.localStorage.getItem('token');

    config.headers.authorization = `Bearer ${token}`
    return config;
})
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}