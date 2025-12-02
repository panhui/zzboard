
<template>
  <div class="space-y-8">
    <!-- Notice Carousel (Optimized) -->
    <div v-if="notices.length > 0" class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <el-icon :size="20"><BellFilled /></el-icon>
        </div>
        <div class="flex-1 overflow-hidden">
            <el-carousel height="24px" direction="vertical" :autoplay="true" indicator-position="none" :interval="4000">
                <el-carousel-item v-for="(notice, index) in notices" :key="index" class="flex items-center">
                    <div class="text-sm text-gray-700 truncate flex items-center gap-2 w-full cursor-pointer hover:text-blue-600 transition-colors" @click="showNoticeDetail(notice)">
                        <span class="font-bold text-gray-800">[{{ notice.title }}]</span>
                        <!-- Strip markdown chars for simple preview -->
                        <span class="text-gray-600 truncate">{{ stripMarkdown(notice.content) }}</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="text-gray-400 cursor-pointer hover:text-blue-600 hidden md:block" @click="showNoticeDetail(notices[0])">
             <el-icon><ArrowRight /></el-icon>
        </div>
    </div>

    <!-- Header / Greeting -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 class="text-3xl font-bold text-gray-800">
                {{ greeting }}, 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ userStore.userInfo.email?.split('@')[0] || 'User' }}
                </span>
            </h1>
            <p class="text-gray-500 mt-2">欢迎回到永连加速器，祝您今天过得愉快！</p>
        </div>
        <div class="text-right hidden md:block">
            <p class="text-sm text-gray-400">上次登录时间</p>
            <p class="font-mono text-gray-600">{{ new Date().toLocaleDateString() }}</p>
        </div>
    </div>

    <!-- Stats Cards (Optimized Light Theme with Gradients) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Plan Card -->
      <el-card class="!rounded-2xl shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-blue-50/60 border border-blue-100 relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <el-icon :size="100" class="text-blue-600"><Trophy /></el-icon>
        </div>
        <div class="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
            <div>
                <div class="flex items-center gap-2 mb-3">
                     <span class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-blue-600 border border-blue-200">
                         <el-icon><Trophy /></el-icon>
                     </span>
                     <span class="font-bold text-gray-600">当前套餐</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mt-2 truncate">{{ userStore.userInfo.planName }}</h3>
            </div>
            <div class="mt-4">
                 <div class="flex items-center gap-2 text-sm text-blue-600/80 bg-blue-50/50 rounded-lg px-2 py-1 w-fit border border-blue-100">
                     <el-icon><Calendar /></el-icon>
                     <span>到期: {{ userStore.userInfo.expireDate }}</span>
                 </div>
            </div>
        </div>
      </el-card>

      <!-- Balance Card -->
      <el-card class="!rounded-2xl shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-orange-50/60 border border-orange-100 relative overflow-hidden group">
         <div class="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
             <div>
                 <div class="flex items-center gap-2 mb-3">
                     <span class="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center text-orange-600 border border-orange-200">
                         <el-icon><Wallet /></el-icon>
                     </span>
                     <span class="font-bold text-gray-600">账户余额</span>
                 </div>
                 <h3 class="text-3xl font-bold text-gray-900 mt-2 tracking-wide">¥{{ userStore.userInfo.balance.toFixed(2) }}</h3>
             </div>
             <div class="mt-4">
                 <el-button size="small" color="#f97316" plain class="!rounded-lg !font-bold hover:!bg-orange-50" @click="$router.push('/dashboard/subscribe')">
                     立即充值
                 </el-button>
             </div>
         </div>
      </el-card>

      <!-- Traffic Card -->
      <el-card class="!rounded-2xl shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-emerald-50/60 border border-emerald-100 relative">
         <div class="flex items-center justify-between h-full min-h-[140px]">
             <div>
                 <div class="flex items-center gap-2 mb-3">
                     <span class="w-8 h-8 rounded-lg bg-emerald-100/50 flex items-center justify-center text-emerald-600 border border-emerald-200">
                         <el-icon><DataLine /></el-icon>
                     </span>
                     <span class="text-gray-600 font-bold">流量使用</span>
                 </div>
                 <div class="text-2xl font-bold text-gray-800">
                     {{ userStore.userInfo.trafficUsed }} <span class="text-sm font-normal text-gray-500">GB</span>
                 </div>
                 <div class="text-xs text-gray-400 mt-1">
                     总计: {{ userStore.userInfo.trafficTotal }} GB
                 </div>
                 <div class="mt-3 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit border border-emerald-100" v-if="userStore.userInfo.resetDay">
                     距离重置还有 {{ userStore.userInfo.resetDay }} 天
                 </div>
             </div>
             <div class="relative">
                 <el-progress type="circle" :percentage="trafficPercentage" :width="100" :stroke-width="10" :color="colors" />
             </div>
         </div>
      </el-card>
    </div>

    <!-- Client Tutorials Section -->
    <div>
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <el-icon class="text-purple-500"><Reading /></el-icon> 客户端教程
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div @click="goToTutorial('1')" class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex items-center gap-4 hover:bg-blue-50/50 group">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <el-icon :size="24"><Monitor /></el-icon>
                </div>
                <div>
                    <div class="font-bold text-gray-700">Windows</div>
                    <div class="text-xs text-gray-400 mt-1">查看教程</div>
                </div>
            </div>

            <div @click="goToTutorial('3')" class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex items-center gap-4 hover:bg-green-50/50 group">
                <div class="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <el-icon :size="24"><Cellphone /></el-icon>
                </div>
                <div>
                    <div class="font-bold text-gray-700">Android</div>
                    <div class="text-xs text-gray-400 mt-1">查看教程</div>
                </div>
            </div>

            <div @click="goToTutorial('2')" class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex items-center gap-4 hover:bg-gray-100/50 group">
                <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    <el-icon :size="24"><Iphone /></el-icon>
                </div>
                <div>
                    <div class="font-bold text-gray-700">iOS</div>
                    <div class="text-xs text-gray-400 mt-1">查看教程</div>
                </div>
            </div>

            <div @click="goToTutorial('4')" class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex items-center gap-4 hover:bg-gray-100/50 group">
                <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-gray-600 group-hover:text-white transition-colors">
                    <el-icon :size="24"><Platform /></el-icon>
                </div>
                <div>
                    <div class="font-bold text-gray-700">macOS</div>
                    <div class="text-xs text-gray-400 mt-1">查看教程</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions Grid (Wireframe Style) -->
    <div>
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <el-icon class="text-blue-500"><Lightning /></el-icon> 快捷操作
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button @click="copyLink" class="bg-white border border-gray-200 rounded-xl py-4 px-4 flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all text-gray-700 font-medium group">
                <el-icon :size="20"><CopyDocument /></el-icon>
                <span>复制链接</span>
            </button>

            <button @click="importClash" class="bg-white border border-gray-200 rounded-xl py-4 px-4 flex items-center justify-center gap-2 hover:border-purple-500 hover:text-purple-600 hover:shadow-md transition-all text-gray-700 font-medium group">
                <el-icon :size="20"><Iphone /></el-icon>
                <span>导入 Clash</span>
            </button>

            <button @click="importShadowrocket" class="bg-white border border-gray-200 rounded-xl py-4 px-4 flex items-center justify-center gap-2 hover:border-orange-500 hover:text-orange-600 hover:shadow-md transition-all text-gray-700 font-medium group">
                <el-icon :size="20"><Monitor /></el-icon>
                <span>导入小火箭</span>
            </button>

            <button @click="showQrCode" class="bg-white border border-gray-200 rounded-xl py-4 px-4 flex items-center justify-center gap-2 hover:border-green-500 hover:text-green-600 hover:shadow-md transition-all text-gray-700 font-medium group">
                <el-icon :size="20"><FullScreen /></el-icon>
                <span>二维码</span>
            </button>
        </div>
    </div>

    <!-- QR Code Dialog -->
    <el-dialog v-model="qrDialogVisible" title="订阅二维码" width="300px" center class="rounded-xl">
        <div class="flex flex-col items-center justify-center p-2">
            <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="Subscription QR Code" class="w-48 h-48 mb-4 border p-2 rounded-lg" />
            <p class="text-sm text-gray-500 text-center">请使用 Shadowrocket 或其他支持扫码的客户端扫描</p>
        </div>
    </el-dialog>
    
    <!-- Notice Detail Dialog -->
    <el-dialog v-model="noticeDialogVisible" :title="currentNotice?.title" width="600px" class="rounded-xl">
        <!-- Markdown Rendered Content -->
        <div 
            class="markdown-content text-gray-700 leading-relaxed overflow-y-auto max-h-[60vh]" 
            v-if="currentNotice" 
            v-html="renderMarkdown(currentNotice.content)"
        ></div>
        <template #footer>
            <el-button @click="noticeDialogVisible = false" type="primary">关闭</el-button>
        </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { 
    Trophy, Wallet, CopyDocument, Iphone, Monitor, 
    FullScreen, DataLine, Lightning, Calendar,
    Platform, Cellphone, Reading, BellFilled, ArrowRight
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import QRCode from 'qrcode';
import { fetchNotice } from '../../api/auth';
import { marked } from 'marked';

const userStore = useUserStore();
const router = useRouter();
const qrDialogVisible = ref(false);
const qrCodeUrl = ref('');
const notices = ref<any[]>([]);
const noticeDialogVisible = ref(false);
const currentNotice = ref<any>(null);

onMounted(async () => {
    if (userStore.token) {
        userStore.fetchUserInfo();
        loadNotice();
    }
});

const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 6) return '夜深了';
    if (hour < 12) return '早上好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    return '晚上好';
});

const loadNotice = async () => {
    try {
        const res = await fetchNotice();
        if (res.data && Array.isArray(res.data)) {
            notices.value = res.data;
        }
    } catch (e) {
        console.error("Failed to fetch notices");
    }
};

const showNoticeDetail = (notice: any) => {
    currentNotice.value = notice;
    noticeDialogVisible.value = true;
};

// Markdown renderer
const renderMarkdown = (content: string) => {
    if (!content) return '';
    return marked.parse(content);
};

// Simple strip markdown for carousel preview
const stripMarkdown = (content: string) => {
    if (!content) return '';
    // Remove headers, bold, etc mostly
    return content
        .replace(/[#*`_~]/g, '') // remove symbols
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove links keep text
        .trim();
};

const trafficPercentage = computed(() => {
    if (!userStore.userInfo.trafficTotal || userStore.userInfo.trafficTotal === 0) return 0;
    const p = Math.round((userStore.userInfo.trafficUsed / userStore.userInfo.trafficTotal) * 100);
    return Math.min(100, Math.max(0, p));
});

const colors = [
  { color: '#10B981', percentage: 60 },
  { color: '#F59E0B', percentage: 80 },
  { color: '#EF4444', percentage: 100 },
];

const copyLink = () => {
    const url = userStore.userInfo.subscribeUrl;
    if (!url) return ElMessage.warning('正在获取订阅信息，请稍后...');
    
    navigator.clipboard.writeText(url).then(() => {
        ElMessage.success("订阅链接已复制到剪贴板");
    }).catch(() => {
        ElMessage.error("复制失败，请手动复制");
    });
};

const importClash = () => {
    const url = userStore.userInfo.subscribeUrl;
    if (!url) return ElMessage.warning('正在获取订阅信息...');
    const clashUrl = `clash://install-config?url=${encodeURIComponent(url)}&name=Yonglian`;
    window.location.href = clashUrl;
};

const importShadowrocket = () => {
    const url = userStore.userInfo.subscribeUrl;
    if (!url) return ElMessage.warning('正在获取订阅信息...');
    const srUrl = `shadowrocket://add/${url}`;
    window.location.href = srUrl;
};

const showQrCode = async () => {
     const url = userStore.userInfo.subscribeUrl;
     if (!url) return ElMessage.warning('正在获取订阅信息...');
     
     try {
         qrCodeUrl.value = await QRCode.toDataURL(url, { margin: 2, width: 256 });
         qrDialogVisible.value = true;
     } catch (err) {
         console.error(err);
         ElMessage.error('二维码生成失败');
     }
};

const goToTutorial = (id: string) => {
    router.push({ path: '/dashboard/knowledge', query: { id } });
};
</script>

<style>
/* Scoped CSS for Markdown Content */
.markdown-content h1 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
.markdown-content h2 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; margin-top: 1em; }
.markdown-content h3 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.5em; }
.markdown-content p { margin-bottom: 0.8em; }
.markdown-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
.markdown-content ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
.markdown-content li { margin-bottom: 0.3em; }
.markdown-content a { color: #3b82f6; text-decoration: underline; }
.markdown-content blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; color: #6b7280; font-style: italic; }
.markdown-content code { background-color: #f3f4f6; padding: 0.2em 0.4em; rounded: 4px; font-family: monospace; }
</style>
