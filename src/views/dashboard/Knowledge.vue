
<template>
  <div class="space-y-6">
    <!-- Header with Search -->
    <div class="grid grid-cols-1 lg:grid-cols-[2fr,1.1fr] gap-4 mb-2">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shadow-inner">
            <el-icon :size="26"><Reading /></el-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800">{{ $t('knowledge.title') }}</h2>
            <p class="text-sm text-gray-600">按平台查看「下载 → 导入 → 连接」全流程，并附常见问题。</p>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="badge in heroBadges" :key="badge.text" class="flex items-center gap-2 bg-white/70 border border-white rounded-xl px-3 py-2 text-xs text-gray-700">
            <el-icon :size="16" :class="badge.color"><component :is="badge.icon" /></el-icon>
            <span>{{ badge.text }}</span>
          </div>
        </div>
      </div>
      <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">快速查找</p>
          <el-tag size="small" type="info" effect="light" class="!rounded-full">关键词 / 平台</el-tag>
        </div>
        <el-input
          v-model="searchQuery"
          :placeholder="$t('knowledge.search')"
          prefix-icon="Search"
          class="!w-full"
          clearable
        />
        <div class="flex flex-wrap gap-2 text-xs text-gray-500">
          <span v-for="platform in platforms" :key="platform.id" class="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full cursor-pointer hover:border-blue-400 hover:text-blue-600" @click="activeNames = [platform.id]">{{ platform.name }}</span>
        </div>
      </div>
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
                      <div class="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                          {{ idx + 1 }}
                      </div>
                      <div class="flex-1">
                          <p class="leading-relaxed font-medium text-gray-800">{{ step.text }}</p>
                          <p v-if="step.tip" class="text-xs text-gray-500 mt-1">{{ step.tip }}</p>
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
                       <h4 class="font-bold text-gray-800 mb-2 flex gap-2 items-center">
                           <span class="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">FAQ</span> {{ qa.q }}
                       </h4>
                       <p class="text-gray-600 pl-4 border-l-2 border-gray-200 leading-relaxed">
                           {{ qa.a }}
                       </p>
                   </div>
               </div>

               <div v-if="item.hints" class="mt-4 p-4 bg-white rounded-xl border border-dashed border-blue-100 text-sm text-gray-600 flex gap-2">
                   <el-icon class="text-blue-500"><InfoFilled /></el-icon>
                   <div>
                       <p class="font-semibold text-gray-800 mb-1">小贴士</p>
                       <ul class="list-disc list-inside space-y-1">
                           <li v-for="(hint, idx) in item.hints" :key="idx">{{ hint }}</li>
                       </ul>
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
    QuestionFilled, CopyDocument, InfoFilled,
    Link, Download, Connection, HelpFilled
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../../stores/user';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const userStore = useUserStore();
const activeNames = ref<string[]>(['1']);
const searchQuery = ref('');

const heroBadges = [
    { icon: Download, text: '下载与订阅', color: 'text-blue-500' },
    { icon: Link, text: '一键导入', color: 'text-emerald-500' },
    { icon: Connection, text: '连接排障', color: 'text-indigo-500' },
    { icon: HelpFilled, text: '常见问题', color: 'text-amber-500' }
];

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
            { text: '在节点页面或官网下载 v2rayN 客户端并解压。', tip: '推荐使用官网最新版本，避免证书过期。' },
            { text: '复制您的专属订阅链接。', code: userStore.userInfo.subscribeUrl || '请先登录获取订阅链接' },
            { text: '打开 v2rayN，点击 "订阅" -> "订阅设置" -> "添加"，名称可填 Yonglian。' },
            { text: '在 "地址(url)" 栏粘贴链接并保存，然后点击右键更新订阅。' }
        ],
        hints: [
            '如遇更新失败，可在任务栏右键退出 v2rayN 后重开再试。',
            '务必保持系统时间自动同步，否则可能握手失败。'
        ]
    },
    {
        id: '2',
        title: t('knowledge.ios'),
        icon: Iphone,
        color: 'text-gray-800',
        steps: [
            { text: '使用非国区 Apple ID 登录 App Store（或使用 TestFlight 账号）。' },
            { text: '搜索并下载 "Shadowrocket"（小火箭）。', tip: '若无法购买，可在工单说明需要美区账号。' },
            { text: '回到仪表盘点击「一键订阅」>「导入小火箭」自动完成。' },
            { text: '若自动失败，复制订阅链接后打开小火箭，弹窗确认添加。' }
        ],
        hints: [
            '首次连接建议选择低倍率节点，确认可用后再切换高倍率线路。',
            '若提示「无效证书」，在小火箭设置里关闭验证并重新更新订阅。'
        ]
    },
    {
        id: '3',
        title: 'Android 使用教程',
        icon: Cellphone,
        color: 'text-green-500',
        steps: [
            { text: '下载 v2rayNG 或 Clash for Android 客户端。', tip: '首选 Play 商店或 Github Release 渠道。' },
            { text: '复制订阅链接。', code: userStore.userInfo.subscribeUrl || '请先登录' },
            { text: '在 App 内找到订阅/配置，粘贴 URL 保存并更新。' },
            { text: '选中配置文件点击连接，必要时重启飞行模式刷新网络。' }
        ],
        hints: [
            '如遇「无法解析」错误，可尝试更换系统 DNS 为 1.1.1.1 / 8.8.8.8。',
            'Clash 类客户端建议开启「系统代理」以便全局生效。'
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
        ],
        hints: [
            'Safari 若无法代理，可在「网络偏好设置」中勾选自动代理。',
            'ClashX 若启动即退出，尝试授予网络代理与驱动权限后重开。'
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
    return tutorials.value.filter(t => {
        const titleMatch = t.title.toLowerCase().includes(query);
        const stepMatch = t.steps?.some(step => step.text.toLowerCase().includes(query)) ?? false;
        const qaMatch = t.qa?.some(qa => qa.q.toLowerCase().includes(query) || qa.a.toLowerCase().includes(query)) ?? false;
        return titleMatch || stepMatch || qaMatch;
    });
});

const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    ElMessage.success('已复制');
};
</script>
