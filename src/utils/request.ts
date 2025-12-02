
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router';

// Create axios instance
const service = axios.create({
  baseURL: 'https://yonglian.2223.pub/api/v1',
  timeout: 15000,
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('xboard_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => {
    // Xboard API usually returns 200 OK with a data body
    // The structure provided: { status: "success", data: { ... }, message: "..." }
    const res = response.data;
    
    // If the API returns a logical error via 'status' field (some APIs do this)
    if (res.status === 'fail' || res.status === 'error') {
        ElMessage.error(res.message || 'Error');
        return Promise.reject(new Error(res.message || 'Error'));
    }

    return res;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || '网络请求错误';

    if (status === 401) {
      // Token expired or invalid
      ElMessage.error('登录已过期，请重新登录');
      localStorage.removeItem('xboard_token');
      router.push('/login');
    } else if (status === 422) {
      // Validation errors
      const errors = error.response?.data?.errors;
      if (errors) {
          // Join first error of each field
          const errorMsg = Object.values(errors).flat().join(', ');
          ElMessage.error(errorMsg);
      } else {
          ElMessage.error(message);
      }
    } else {
      ElMessage.error(message);
    }
    return Promise.reject(error);
  }
);

export default service;
