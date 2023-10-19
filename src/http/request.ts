import axios from 'axios';
import Qs from 'qs';
import { getToken} from '@/utils/tools';
import { ElMessage } from "element-plus"
import type {AxiosError} from 'axios'

export const request = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_APP_BASE_API,
  paramsSerializer: function(params){
    return Qs.stringify(params);
  }
})

request.interceptors.request.use(
  (config) => {
    //如果本地存在Authorization，则添加到请求头上
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    const apiData = response.data;
    // 二进制数据则直接返回
    const responseType = response.request?.responseType
    if (responseType === "blob" || responseType === "arraybuffer") return apiData;

    // 这个 code 是和后端约定的业务 code
    const code = apiData.code
    // 如果没有 code, 代表返回数据异常
    if (code === undefined) {
      ElMessage.error("服务返回数据异常")
      return Promise.reject(new Error("服务返回数据异常"))
    }

    switch (code) {
      case 200:
        // 本系统采用 code === 200 来表示没有业务错误
        return apiData
      default:
        // 不是正确的 code
        ElMessage.error(apiData.message || "Error")
        return Promise.reject(new Error("Error"))
    }
  }, 
  (error: AxiosError) => {
    if(error.response){
      const status = error.response?.status;
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时,退出登录
          localStorage.removeItem('token');
          window.location.href = '/login';
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
    }else{
      ElMessage.error('请求未响应或请求发送失败')
    }

    return Promise.reject(error)
  }
)