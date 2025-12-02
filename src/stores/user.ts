
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login as apiLogin, getUserInfo as apiGetUserInfo, getSubscribe as apiGetSubscribe } from '../api/auth';
import { ElNotification } from 'element-plus';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('xboard_token') || '');
  
  // Initialize with default values, try loading from localStorage first
  const userInfo = ref({
    email: localStorage.getItem('xboard_email') || '',
    avatar: '',
    balance: 0.00,
    planName: 'Loading...',
    trafficUsed: 0, // GB
    trafficTotal: 0, // GB
    expireDate: '-',
    subscribeUrl: localStorage.getItem('xboard_subscribe_url') || '',
    resetDay: 0
  });

  async function login(formData: any) {
    try {
      const response = await apiLogin(formData);
      
      const authData = response.data?.auth_data;
      
      if (authData) {
          token.value = authData;
          localStorage.setItem('xboard_token', authData);
          
          // Fetch user info immediately after login
          await fetchUserInfo();
          
          return Promise.resolve(response);
      } else {
          return Promise.reject(new Error('Invalid response: No auth_data received'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function fetchUserInfo() {
    try {
        // Parallel requests to get basic info and subscription details
        const [infoRes, subRes] = await Promise.all([
            apiGetUserInfo(), 
            apiGetSubscribe()
        ]);

        const infoData = infoRes.data;
        const subData = subRes.data;
        
        // 1. Map User Info (Balance, Email)
        if (infoData) {
            userInfo.value.email = infoData.email;
            localStorage.setItem('xboard_email', infoData.email); // Persist email

            userInfo.value.avatar = infoData.avatar_url;
            userInfo.value.balance = Number(infoData.balance) / 100; // API usually returns cents
        }

        // 2. Map Subscription Info (Traffic, Plan, Url)
        if (subData) {
            // Plan Name
            userInfo.value.planName = subData.plan ? subData.plan.name : '暂无订阅';
            
            // Traffic Calculation (Bytes to GB)
            const totalBytes = subData.transfer_enable || 0;
            const usedBytes = (subData.u || 0) + (subData.d || 0);
            
            userInfo.value.trafficTotal = parseFloat((totalBytes / 1073741824).toFixed(2)); 
            userInfo.value.trafficUsed = parseFloat((usedBytes / 1073741824).toFixed(2));
            
            // Expiry Date
            if (subData.expired_at) {
                const date = new Date(subData.expired_at * 1000);
                userInfo.value.expireDate = date.toLocaleDateString();
            } else {
                userInfo.value.expireDate = '长期有效';
            }

            // Subscription URL
            userInfo.value.subscribeUrl = subData.subscribe_url;
            if (subData.subscribe_url) {
                localStorage.setItem('xboard_subscribe_url', subData.subscribe_url); // Persist URL
            }
            
            // Sync Email if present in subData
            if (subData.email) {
                userInfo.value.email = subData.email;
                localStorage.setItem('xboard_email', subData.email);
            }
            
            // Reset Day
            userInfo.value.resetDay = subData.reset_day || 0;
        }

    } catch (error) {
        console.error('Failed to fetch user info', error);
    }
  }

  function logout() {
    token.value = '';
    localStorage.removeItem('xboard_token');
    localStorage.removeItem('xboard_email');
    localStorage.removeItem('xboard_subscribe_url');
    
    userInfo.value = {
        email: '',
        avatar: '',
        balance: 0,
        planName: '-',
        trafficUsed: 0,
        trafficTotal: 0,
        expireDate: '-',
        subscribeUrl: '',
        resetDay: 0
    };
  }

  return { token, userInfo, login, logout, fetchUserInfo };
});
