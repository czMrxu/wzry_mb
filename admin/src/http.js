import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({   // 设置基础路径
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function(config){   // 设置请求头发送 token 数据
    if(localStorage.token){
        config.headers.Authorization = 'Bearner ' + localStorage.token;
    }
    return config;
}, function(error){
    return Promise.reject(error);
})

http.interceptors.response.use(res => {
    return res;
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        if(err.response.status === 401){
            router.push('/login');
        }
    }
})

export default http;