

<template>
  <el-container class="h-screen bg-gray-50">
    <!-- Sidebar -->
    <el-aside width="240px" class="bg-white border-r border-gray-200 flex flex-col transition-all hidden md:flex">
      <div class="h-16 flex items-center justify-center border-b border-gray-100">
        <h1 class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {{ $t('app_name') }}
        </h1>
      </div>
      
      <el-menu
        :default-active="activeRoute"
        class="border-none flex-1 py-4"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <span>{{ $t('menu.dashboard') }}</span>
        </el-menu-item>

        <el-menu-item index="/dashboard/knowledge">
          <el-icon><Document /></el-icon>
          <span>{{ $t('menu.knowledge') }}</span>
        </el-menu-item>
        
        <!-- Subscription Group -->
        <el-menu-item-group :title="$t('menu.group_subscribe')">
            <el-menu-item index="/dashboard/subscribe">
              <el-icon><CreditCard /></el-icon>
              <span>{{ $t('menu.subscribe') }}</span>
            </el-menu-item>
            
            <el-menu-item index="/dashboard/orders">
              <el-icon><Money /></el-icon>
              <span>{{ $t('menu.orders') }}</span>
            </el-menu-item>
        </el-menu-item-group>

        <!-- User Group -->
        <el-menu-item-group :title="$t('menu.group_user')">
            <el-menu-item index="/dashboard/traffic">
              <el-icon><DataLine /></el-icon>
              <span>{{ $t('menu.traffic') }}</span>
            </el-menu-item>

            <el-menu-item index="/dashboard/nodes">
              <el-icon><Connection /></el-icon>
              <span>{{ $t('menu.nodes') }}</span>
            </el-menu-item>

            <el-menu-item index="/dashboard/tickets">
              <el-icon><Service /></el-icon>
              <span>{{ $t('menu.tickets') }}</span>
            </el-menu-item>

            <el-menu-item index="/dashboard/invite">
              <el-icon><Share /></el-icon>
              <span>{{ $t('menu.invite') }}</span>
            </el-menu-item>

            <el-menu-item index="/dashboard/profile">
              <el-icon><User /></el-icon>
              <span>{{ $t('menu.profile') }}</span>
            </el-menu-item>
        </el-menu-item-group>

      </el-menu>

      <div class="p-4 border-t border-gray-100">
         <div class="flex items-center gap-3 mb-4 px-2">
             <el-avatar :size="32" class="bg-blue-100 text-blue-600">
               {{ (userStore.userInfo.email?.[0] || 'U').toUpperCase() }}
             </el-avatar>
             <div class="flex-1 overflow-hidden">
                 <p class="text-sm font-medium truncate">{{ userStore.userInfo.email || 'User' }}</p>
                 <p class="text-xs text-gray-400">{{ $t('menu.user_role') }}</p>
             </div>
         </div>
         <el-button @click="handleLogout" type="danger" plain class="w-full" size="small">
            <el-icon class="mr-1"><SwitchButton /></el-icon> {{ $t('menu.logout') }}
         </el-button>
      </div>
    </el-aside>

    <!-- Mobile Drawer for Menu -->
    <el-drawer v-model="drawer" direction="ltr" size="240px" :with-header="false">
         <div class="h-16 flex items-center justify-center border-b border-gray-100 mb-4">
            <h1 class="text-xl font-bold text-blue-600">{{ $t('app_name') }}</h1>
         </div>
         <el-menu :default-active="activeRoute" class="border-none" router @select="drawer = false">
            <el-menu-item index="/dashboard">
                <el-icon><Odometer /></el-icon> <span>{{ $t('menu.dashboard') }}</span>
            </el-menu-item>

            <el-menu-item index="/dashboard/knowledge">
                <el-icon><Document /></el-icon> <span>{{ $t('menu.knowledge') }}</span>
            </el-menu-item>
            
            <el-menu-item-group :title="$t('menu.group_subscribe')">
                <el-menu-item index="/dashboard/subscribe">
                    <el-icon><CreditCard /></el-icon> <span>{{ $t('menu.subscribe') }}</span>
                </el-menu-item>
                
                <el-menu-item index="/dashboard/orders">
                    <el-icon><Money /></el-icon> <span>{{ $t('menu.orders') }}</span>
                </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group :title="$t('menu.group_user')">
                <el-menu-item index="/dashboard/traffic">
                    <el-icon><DataLine /></el-icon> <span>{{ $t('menu.traffic') }}</span>
                </el-menu-item>

                <el-menu-item index="/dashboard/nodes">
                    <el-icon><Connection /></el-icon> <span>{{ $t('menu.nodes') }}</span>
                </el-menu-item>

                <el-menu-item index="/dashboard/tickets">
                    <el-icon><Service /></el-icon> <span>{{ $t('menu.tickets') }}</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/invite">
                    <el-icon><Share /></el-icon> <span>{{ $t('menu.invite') }}</span>
                </el-menu-item>
                <el-menu-item index="/dashboard/profile">
                  <el-icon><User /></el-icon>
                  <span>{{ $t('menu.profile') }}</span>
                </el-menu-item>
            </el-menu-item-group>
         </el-menu>
    </el-drawer>

    <el-container>
      <!-- Header -->
      <el-header class="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
        <div class="flex items-center gap-4">
            <el-button class="md:hidden" text @click="drawer = true">
                <el-icon :size="20"><Menu /></el-icon>
            </el-button>
            <!-- Title removed as requested previously -->
        </div>
        
        <div class="flex items-center gap-4">
           <!-- Language Switcher -->
          <el-dropdown @command="handleLangChange">
            <span class="el-dropdown-link flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
               <!-- Custom Translate Icon -->
               <svg viewBox="0 0 36 36" width="22" height="22" xmlns="http://www.w3.org/2000/svg" class="text-gray-600 fill-current">
                   <path d="m11 16.5l-1 3.1h2z" />
                   <path d="M30.3 3h-16v5h4v2h-13c-1.7 0-3 1.3-3 3v11c0 1.7 1.3 3 3 3h1v5.1l6.3-5.1h6.7v-7h11c1.7 0 3-1.3 3-3V6c0-1.7-1.3-3-3-3M13.1 22.9l-.5-1.6H9.5l-.6 1.6H6.5L9.8 14h2.4l3.3 8.9zM28.3 15v2c-1.3 0-2.7-.4-3.9-1c-1.2.6-2.6.9-4 1l-.1-2q1.05 0 2.1-.3c-.9-.9-1.5-2-1.8-3.2h2.1c.3.9.9 1.6 1.6 2.2c1.1-.9 1.8-2.2 1.9-3.7h-6V8h3V6h2v2h3.3l.1 1c.1 2.1-.7 4.2-2.2 5.7c.7.2 1.3.3 1.9.3" />
                   <path fill="none" d="M0 0h36v36H0z"/>
               </svg>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN">简体中文</el-dropdown-item>
                <el-dropdown-item command="en-US">English</el-dropdown-item>
                <el-dropdown-item command="ja-JP">日本語</el-dropdown-item>
                <el-dropdown-item command="ko-KR">한국어</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- Copy Subscription Button -->
          <el-button type="primary" round class="!bg-blue-600" @click="handleCopySubscribe">
             <el-icon class="mr-1"><CopyDocument /></el-icon> {{ $t('dashboard.copy_link') }}
          </el-button>
        </div>
      </el-header>

      <!-- Main Content -->
      <el-main class="p-6 overflow-y-auto">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { 
    Odometer, Connection, CreditCard, Document, Money, 
    SwitchButton, Menu, CopyDocument,
    DataLine, Service, Share, User
} from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const drawer = ref(false);
const { locale, t } = useI18n();

const activeRoute = computed(() => route.path);

const handleLangChange = (lang: string) => {
    locale.value = lang;
};

const handleLogout = () => {
  userStore.logout();
  router.push('/');
};

const handleCopySubscribe = () => {
    const url = userStore.userInfo.subscribeUrl;
    if (!url) {
        ElMessage.warning('正在获取订阅链接，请稍后');
        return;
    }
    navigator.clipboard.writeText(url).then(() => {
        ElMessage.success(t('dashboard.copy_success'));
    }).catch(() => {
        ElMessage.error('复制失败');
    });
};
</script>

<style scoped>
.el-menu-item.is-active {
  background-color: #ecf5ff;
  border-right: 3px solid #409eff;
  color: #409eff;
  font-weight: 500;
}
/* Optional: Style for menu item group title */
:deep(.el-menu-item-group__title) {
    padding-top: 12px;
    padding-bottom: 8px;
    font-size: 12px;
    color: #909399;
}
</style>