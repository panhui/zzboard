import request from '../utils/request';

export const login = (data: any) => {
  return request({
    url: '/passport/auth/login',
    method: 'post',
    data
  });
};

export const register = (data: any) => {
  return request({
    url: '/passport/auth/register',
    method: 'post',
    data
  });
};

export const forgetPassword = (data: any) => {
  return request({
    url: '/passport/auth/forget',
    method: 'post',
    data
  });
};

export const getGuestConfig = () => {
  return request({
    url: '/guest/comm/config',
    method: 'get'
  });
};

export const sendEmailVerify = (email: string) => {
  return request({
    url: '/passport/comm/sendEmailVerify',
    method: 'post',
    data: { email }
  });
};

export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  });
};

export const getSubscribe = () => {
  return request({
    url: '/user/getSubscribe',
    method: 'get'
  });
};

export const updatePassword = (data: any) => {
  return request({
    url: '/user/changePassword',
    method: 'post',
    data
  });
};

export const resetSecurity = () => {
  return request({
    url: '/user/resetSecurity',
    method: 'get'
  });
};

export const fetchNotice = () => {
  return request({
    url: '/user/notice/fetch',
    method: 'get'
  });
};

export const fetchServers = () => {
  return request({
    url: '/user/server/fetch',
    method: 'get'
  });
};

export const fetchTickets = (params?: any) => {
  return request({
    url: '/user/ticket/fetch',
    method: 'get',
    params
  });
};

export const saveTicket = (data: any) => {
  return request({
    url: '/user/ticket/save',
    method: 'post',
    data
  });
};

export const replyTicket = (data: any) => {
  return request({
    url: '/user/ticket/reply',
    method: 'post',
    data
  });
};

export const closeTicket = (data: any) => {
  return request({
    url: '/user/ticket/close',
    method: 'post',
    data
  });
};

export const fetchOrders = () => {
  return request({
    url: '/user/order/fetch',
    method: 'get'
  });
};

export const saveOrder = (data: any) => {
  return request({
    url: '/user/order/save',
    method: 'post',
    data
  });
};

export const fetchOrderDetail = (params: any) => {
  return request({
    url: '/user/order/detail',
    method: 'get',
    params
  });
};

export const cancelOrder = (data: any) => {
  return request({
    url: '/user/order/cancel',
    method: 'post',
    data
  });
};

export const getPaymentMethods = () => {
  return request({
    url: '/user/order/getPaymentMethod',
    method: 'get'
  });
};

export const checkoutOrder = (data: any) => {
  return request({
    url: '/user/order/checkout',
    method: 'post',
    data
  });
};