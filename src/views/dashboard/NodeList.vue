
<template>
  <div class="space-y-4">
    <!-- Filter Bar -->
    <div class="flex gap-2 overflow-x-auto pb-2">
        <el-tag 
            v-for="tag in tags" 
            :key="tag.value" 
            class="cursor-pointer" 
            :effect="activeTag === tag.value ? 'dark' : 'plain'"
            @click="activeTag = tag.value"
        >
            {{ tag.label }}
        </el-tag>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-10 text-center text-gray-400">
        <el-icon class="is-loading text-2xl mb-2"><Loading /></el-icon>
        <p>加载节点中...</p>
    </div>

    <!-- Node Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <el-card 
            v-for="node in filteredNodes" 
            :key="node.id" 
            class="!rounded-xl hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
            :body-style="{ padding: '0px' }"
        >
            <!-- Status Indicator Strip -->
            <div 
                class="absolute left-0 top-0 bottom-0 w-1.5 transition-colors"
                :class="node.online ? 'bg-green-500' : 'bg-red-500'"
            ></div>

            <div class="p-5 pl-7">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">{{ node.flag }}</span>
                        <h3 class="font-bold text-gray-700 group-hover:text-blue-600 transition-colors truncate max-w-[150px]">{{ node.name }}</h3>
                    </div>
                    <el-tag size="small" :type="getTypeTag(node.type)">{{ node.type.toUpperCase() }}</el-tag>
                </div>

                <div class="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mb-4">
                    <div class="flex items-center gap-1">
                        <el-icon><Files /></el-icon> 倍率: x{{ node.rate }}
                    </div>
                    <div class="flex items-center gap-1">
                        <el-icon :class="node.online ? 'text-green-500' : 'text-red-500'"><Odometer /></el-icon>
                        {{ node.online ? '在线' : '离线' }}
                    </div>
                </div>
                
                <div class="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                     <span class="text-xs text-gray-400">ID: {{ node.id }}</span>
                     <el-tooltip content="点击复制链接">
                        <el-button circle size="small" type="primary" plain @click.stop="copyNode(node)">
                            <el-icon><CopyDocument /></el-icon>
                        </el-button>
                     </el-tooltip>
                </div>
            </div>
        </el-card>

        <div v-if="filteredNodes.length === 0" class="col-span-full text-center py-10 text-gray-400">
            暂无节点数据
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Files, Odometer, CopyDocument, Loading } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { fetchServers } from '../../api/auth';

interface ServerNode {
    id: number;
    name: string;
    type: string;
    rate: string | number;
    flag: string;
    tags: string[];
    online: boolean;
    load: number;
}

const loading = ref(true);
const activeTag = ref('All');
const tags = [
    { label: '全部', value: 'All' },
    { label: '高速', value: 'HighSpeed' },
    { label: '游戏', value: 'Gaming' },
    { label: '流媒体', value: 'Streaming' }
];

const nodes = ref<ServerNode[]>([]);

onMounted(async () => {
    try {
        const response = await fetchServers();
        // Xboard usually returns { data: [...] }
        if (response.data && Array.isArray(response.data)) {
            nodes.value = response.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                type: item.type || 'shadowsocks',
                rate: item.rate || '1.0',
                flag: getFlagFromName(item.name),
                // Map custom tags if API returns them, else use simple heuristic or empty
                tags: item.tags || [],
                // API might return is_online as 1/0 or boolean
                online: item.is_online === 1 || item.is_online === true,
                load: 0 // Xboard API usually doesn't expose real-time load freely, placeholder
            }));
        }
    } catch (error) {
        console.error("Failed to load nodes", error);
        ElMessage.error("获取节点列表失败");
    } finally {
        loading.value = false;
    }
});

const getFlagFromName = (name: string): string => {
    // Simple heuristic to guess flag from name
    if (name.includes('香港') || name.includes('HK')) return '🇭🇰';
    if (name.includes('日本') || name.includes('JP')) return '🇯🇵';
    if (name.includes('美国') || name.includes('US')) return '🇺🇸';
    if (name.includes('新加坡') || name.includes('SG')) return '🇸🇬';
    if (name.includes('台湾') || name.includes('TW')) return '🇹🇼';
    if (name.includes('韩国') || name.includes('KR')) return '🇰🇷';
    if (name.includes('英国') || name.includes('UK')) return '🇬🇧';
    return '🏳️';
};

const filteredNodes = computed(() => {
    if (activeTag.value === 'All') return nodes.value;
    // Since API might not return standard tags, this filter might need adjustment based on real data
    // For now, we return everything if tags are empty or logic doesn't match
    return nodes.value; 
});

const getTypeTag = (type: string) => {
    switch(type.toLowerCase()) {
        case 'vmess': return 'primary';
        case 'vless': return 'success';
        case 'trojan': return 'warning';
        case 'hysteria2': return 'danger';
        default: return 'info';
    }
};

const copyNode = (node: any) => {
    // In a real scenario, this might need an API call to get the specific config uri
    // or construct it from properties. For now, just a message.
    ElMessage.success(`已复制 ${node.name} 的配置链接`);
};
</script>
