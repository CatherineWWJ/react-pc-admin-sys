// 封装axios
// 3步走：实例化    请求拦截器   响应拦截器

import axios from "axios";
import { getToken } from "./token";

const http = axios.create({ // 可以将http看作增强版本的axios
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000 // 超时时间配置5s
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        // 在请求拦截器中注入token，这样每次请求数据都会自动携带token
        config.headers.Authorization = `Bearer ${token}` 
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围内的状态码都会触发该函数
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { http }