import api from './api'
const axios = require("axios");

const initParam = {
    'token': JSON.parse(window.localStorage.getItem('userInfo') || '{}').token,
}

api.http = function (url, data, all, type) {
    return new Promise((resolve, reject) => {
        return axios({
            url,
            method: type,
            params: data
        }).then((response) => {
            if (all) {
                resolve(response)
            } else {
               if(response.status === 200) {
                    resolve(response.data)
                } else {
                    // store.dispatch('showMsg', response.errMsg || '系统错误！')
                } 
            }
            
        }).catch((error) => {//错误业务逻辑
            // store.dispatch('showMsg', error.response.data.errMsg ||'系统错误！')
        });
    });
};

api.get = (url, params, all=false) => api.http(url, params, all, "get");
api.post = (url, params, all=false) => api.http(url, params, all, "post");
api.put = (url, params, all=false) => api.http(url, params, all, "put");
api.patch = (url, params, all=false) => api.http(url, params, all, "patch");
api.delete = (url, params, all=false) => api.http(url, params, all, "delete");

// request
axios.interceptors.request.use(
    (config) => {
        // store.dispatch('showLoading', true)
        config.params = Object.assign(config.params || {}, initParam);
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    });

// response
axios.interceptors.response.use((response) => {
    // store.dispatch('showLoading', false)
    return response;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

export default api;

