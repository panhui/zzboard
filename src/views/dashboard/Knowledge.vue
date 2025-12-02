
<template>
  <div class="space-y-6">
    <!-- Header with Search -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
      <h2 class="text-xl font-bold text-gray-800">{{ $t('knowledge.title') }}</h2>
      <el-input 
        v-model="searchQuery"
        :placeholder="$t('knowledge.search')" 
        prefix-icon="Search" 
        class="!w-full md:!w-72" 
        clearable
      />
    </div>

    <!-- Quick Platform Nav -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-if="!searchQuery">
       <div v-for="platform in platforms" :key="platform.id" 
            class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3"
            @click="activeNames = [platform.id]">
           <el-icon :size="24" :class="platform.color"><component :is="platform.icon" /></el-icon>
           <span class="font-medium text-gray-700">{{ platform.name }}</span>
       </div>
    </div>

    <!-- Content List -->
    <el-collapse v-model="activeNames" class="!border-none gap-4 flex flex-col">
      <template v-if="filteredTutorials.length > 0">
          <el-collapse-item 
            v-for="item in filteredTutorials" 
            :key="item.id" 
            :name="item.id"
            class="!border rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <template #title>
              <div class="px-4 py-2 text-base font-medium flex items-center gap-3 w-full">
                <el-icon :class="item.color" :size="20"><component :is="item.icon" /></el-icon> 
                <span>{{ item.title }}</span>
              </div>
            </template>
            
            <div class="p-6 bg-gray-50/50 text-gray-600 border-t border-gray-100">
              <!-- Steps Rendering -->
              <div v-if="item.steps" class="space-y-4">
                  <div v-for="(step, idx) in item.steps" :key="idx" class="flex gap-3">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                          {{ idx + 1 }}
                      </div>
                      <div class="flex-1">
                          <p class="leading-relaxed">{{ step.text }}</p>
                          <!-- Optional Code Block in Step -->
                          <div v-if="step.code" class="mt-2 bg-gray-800 text-gray-200 p-3 rounded-lg font-mono text-xs flex justify-between items-center group">
                              <span class="truncate pr-4">{{ step.code }}</span>
                              <el-icon class="cursor-pointer hover:text-white" @click="copyCode(step.code)"><CopyDocument /></el-icon>
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- Q&A Rendering -->
               <div v-if="item.qa" class="space-y-4">
                   <div v-for="(qa, idx) in item.qa" :key="idx" class="bg-white p-4 rounded-lg border border-gray-100">
                       <h4 class="font-bold text-gray-800 mb-2 flex gap-2">
                           <span class="text-blue-500">Q:</span> {{ qa.q }}
                       </h4>
                       <p class="text-gray-600 pl-6 border-l-2 border-gray-200">
                           {{ qa.a }}
                       </p>
                   </div>
               </div>
            </div>
          </el-collapse-item>
      </template>

      <div v-else class="text-center py-10 text-gray-400">
          <el-icon :size="40" class="mb-2"><Search /></el-icon>
          <p>没有找到相关教程</p>
      </div>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
    Search, Monitor, Iphone, Cellphone, Platform, 
    QuestionFilled, CopyDocument 
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../../stores/user';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const userStore = useUserStore();
const activeNames = ref<string[]>(['1']);
const searchQuery = ref('');

onMounted(() => {
    if (route.query.id) {
        activeNames.value = [route.query.id as string];
    }
});

const platforms = [
    { id: '1', name: 'Windows', icon: Monitor, color: 'text-blue-500' },
    { id: '2', name: 'iOS', icon: Iphone, color: 'text-gray-800' },
    { id: '3', name: 'Android', icon: Cellphone, color: 'text-green-500' },
    { id: '4', name: 'macOS', icon: Platform, color: 'text-gray-600' }
];

const tutorials = computed(() => [
    {
        id: '1',
        title: t('knowledge.windows'),
        icon: Monitor,
        color: 'text-blue-500',
        steps: [
            { text: '在节点页面或官网下载 v2rayN 客户端并解压。' },
            { text: '复制您的专属订阅链接。', code: userStore.userInfo.subscribeUrl || '请先登录获取订阅链接' },
            { text: '打开 v2rayN，点击界面上的 "订阅" -> "订阅设置" -> "添加"。' },
            { text: '在 "地址(url)" 栏粘贴链接，点击确定，然后更新订阅即可。' }
        ]
    },
    {
        id: '2',
        title: t('knowledge.ios'),
        icon: Iphone,
        color: 'text-gray-800',
        steps: [
            { text: '使用非国区 Apple ID 登录 App Store (如果没有，请自行注册或购买)。' },
            { text: '搜索并下载 "Shadowrocket" (小火箭)。' },
            { text: '回到本站仪表盘，点击 "一键订阅" -> "导入 Shadowrocket" 即可自动配置。' },
            { text: '或者复制订阅链接，打开 Shadowrocket，它会自动检测并提示添加。' }
        ]
    },
    {
        id: '3',
        title: 'Android 使用教程',
        icon: Cellphone,
        color: 'text-green-500',
        steps: [
            { text: '下载 v2rayNG 或 Clash for Android 客户端。' },
            { text: '复制订阅链接。', code: userStore.userInfo.subscribeUrl || '请先登录' },
            { text: '打开 App，找到配置文件/订阅设置，添加 URL 并保存。' },
            { text: '选中配置文件，点击连接按钮即可。' }
        ]
    },
     {
        id: '4',
        title: 'macOS 使用教程',
        icon: Platform,
        color: 'text-gray-600',
        steps: [
            { text: '下载 ClashX 或 Clash Verge 客户端。' },
            { text: '点击状态栏图标，配置 -> 托管配置 -> 管理 -> 添加。' },
            { text: '粘贴订阅链接，点击确定，等待更新完成。' },
            { text: '设置为系统代理即可开始使用。' }
        ]
    },
    {
        id: '99',
        title: t('knowledge.faq'),
        icon: QuestionFilled,
        color: 'text-orange-500',
        qa: [
            { q: '为什么连接后无法上网？', a: '请检查电脑时间是否同步，或尝试切换其他节点。如果是 Windows，请检查是否开启了系统代理。' },
            { q: '倍率是什么意思？', a: '倍率 1.0 表示使用 1G 扣除 1G 流量；倍率 0.5 表示使用 1G 仅扣除 0.5G。通常高级专线倍率较高。' },
            { q: '如何重置流量？', a: '流量通常在每月的结算日（注册日或首次购买日）自动重置。您可以在仪表盘查看重置倒计时。' }
        ]
    }
]);

const filteredTutorials = computed(() => {
    if (!searchQuery.value) return tutorials.value;
    const query = searchQuery.value.toLowerCase();
    return tutorials.value.filter(t => 
        t.title.toLowerCase().includes(query)
    );
});

const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    ElMessage.success('已复制');
};
</script>
