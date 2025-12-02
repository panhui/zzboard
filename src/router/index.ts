

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ForgotPassword from '../views/auth/ForgotPassword.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import DashboardHome from '../views/dashboard/DashboardHome.vue';
import NodeList from '../views/dashboard/NodeList.vue';
import Subscribe from '../views/dashboard/Subscribe.vue';
import Knowledge from '../views/dashboard/Knowledge.vue';
import Orders from '../views/dashboard/Orders.vue';
import Traffic from '../views/dashboard/Traffic.vue';
import Tickets from '../views/dashboard/Tickets.vue';
import Invite from '../views/dashboard/Invite.vue';
import Profile from '../views/dashboard/Profile.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: DashboardHome
      },
      {
        path: 'nodes',
        name: 'NodeList',
        component: NodeList
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: Knowledge
      },
      {
        path: 'subscribe',
        name: 'Subscribe',
        component: Subscribe
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders
      },
      {
        path: 'traffic',
        name: 'Traffic',
        component: Traffic
      },
       {
        path: 'tickets',
        name: 'Tickets',
        component: Tickets
      },
      {
        path: 'invite',
        name: 'Invite',
        component: Invite
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(), // Safer for static deployments
  routes
});

// Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('xboard_token');
  
  // 1. Protect Dashboard Routes
  // If trying to access dashboard without token, redirect to login
  if (to.path.startsWith('/dashboard') && !token) {
    next('/login');
    return;
  }

  // 2. Guest-Only Routes (Home, Login, Register, ForgotPassword)
  // If logged in and trying to access these pages, redirect to dashboard
  const guestRoutes = ['/', '/login', '/register', '/forgot-password'];
  if (guestRoutes.includes(to.path) && token) {
    next('/dashboard');
    return;
  }

  // 3. Allow access
  next();
});

export default router;