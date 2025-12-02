
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">{{ $t('tickets.title') }}</h2>
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true">{{ $t('tickets.create') }}</el-button>
    </div>

    <el-card class="!rounded-xl shadow-sm" v-loading="loading">
        <el-table :data="tickets" style="width: 100%">
            <!-- ID Column Removed -->
            <el-table-column prop="subject" :label="$t('tickets.subject')" min-width="150" />
            <el-table-column prop="level" label="优先级" width="100">
                <template #default="scope">
                    <el-tag size="small" :type="getPriorityType(scope.row.level)">
                        {{ getPriorityLabel(scope.row.level) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="$t('tickets.status')" width="120">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)">{{ getStatusLabel(scope.row.status) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" :label="$t('tickets.last_update')" width="180">
                 <template #default="scope">
                    {{ new Date(scope.row.updated_at * 1000).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('tickets.actions')" width="150" fixed="right">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="openDetail(scope.row)">
                        {{ $t('tickets.view') }}
                    </el-button>
                    <!-- Close Button -->
                    <el-popconfirm
                        v-if="scope.row.status !== 2"
                        title="确定要关闭此工单吗？"
                        @confirm="handleCloseTicket(scope.row)"
                    >
                        <template #reference>
                            <el-button link type="danger" size="small">
                                关闭
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="tickets.length === 0 && !loading" class="text-center py-8 text-gray-400">
            暂无工单记录
        </div>
    </el-card>

    <!-- Create Dialog -->
    <el-dialog v-model="dialogVisible" :title="$t('tickets.create')" width="500px" class="rounded-xl">
        <el-form :model="form" label-position="top">
            <el-form-item :label="$t('tickets.subject')">
                <el-input v-model="form.subject" :placeholder="$t('tickets.placeholder_subject')" />
            </el-form-item>
             <el-form-item label="优先级">
                 <el-select v-model="form.level" class="w-full">
                     <el-option label="低" :value="0" />
                     <el-option label="中" :value="1" />
                     <el-option label="高" :value="2" />
                 </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.content" type="textarea" :rows="4" :placeholder="$t('tickets.placeholder_content')" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitTicket" :loading="submitting">{{ $t('tickets.submit') }}</el-button>
        </template>
    </el-dialog>

    <!-- Detail Drawer -->
    <el-drawer v-model="detailDrawerVisible" :title="currentTicket?.subject || $t('tickets.view')" size="500px" direction="rtl">
         <div class="flex flex-col h-full">
             <div class="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-4" v-loading="detailLoading">
                 <div v-for="msg in currentMessages" :key="msg.id" class="flex flex-col" :class="msg.is_me ? 'items-end' : 'items-start'">
                     <div class="max-w-[80%] p-3 rounded-lg text-sm" :class="msg.is_me ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none'">
                         {{ msg.message }}
                     </div>
                     <span class="text-xs text-gray-400 mt-1">{{ new Date(msg.created_at * 1000).toLocaleString() }}</span>
                 </div>
                 <div v-if="currentMessages.length === 0 && !detailLoading" class="text-center text-gray-400">无消息记录</div>
             </div>
             
             <div class="border-t pt-4" v-if="currentTicket?.status !== 2">
                 <el-input v-model="replyMessage" type="textarea" :rows="3" :placeholder="$t('tickets.reply_placeholder')" />
                 <div class="flex justify-end mt-2">
                     <el-button type="primary" @click="handleReply" :loading="replying" :disabled="!replyMessage.trim()">
                         <el-icon class="mr-1"><Position /></el-icon> {{ $t('tickets.send') }}
                     </el-button>
                 </div>
             </div>
             <div v-else class="border-t pt-4 text-center text-gray-400">
                 此工单已关闭，无法回复
             </div>
         </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Plus, Position } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { fetchTickets, saveTicket, replyTicket, closeTicket } from '../../api/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const dialogVisible = ref(false);
const detailDrawerVisible = ref(false);
const loading = ref(true);
const submitting = ref(false);
const tickets = ref<any[]>([]);

// Detail view state
const detailLoading = ref(false);
const currentTicket = ref<any>(null);
const currentMessages = ref<any[]>([]);
const replyMessage = ref('');
const replying = ref(false);

const form = reactive({
    subject: '',
    level: 1,
    content: ''
});

onMounted(() => {
    loadTickets();
});

const loadTickets = async () => {
    loading.value = true;
    try {
        const response = await fetchTickets();
        if (response.data) {
            tickets.value = response.data;
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('获取工单列表失败');
    } finally {
        loading.value = false;
    }
};

const getStatusType = (status: number) => {
    switch(status) {
        case 0: return 'warning'; // 待处理
        case 1: return 'success'; // 已回复
        case 2: return 'info';    // 已关闭
        default: return 'info';
    }
};

const getStatusLabel = (status: number) => {
    switch(status) {
        case 0: return t('tickets.status_open');
        case 1: return t('tickets.status_replied');
        case 2: return t('tickets.status_closed');
        default: return 'Unknown';
    }
};

const getPriorityType = (level: number) => {
     switch(level) {
        case 0: return 'info';
        case 1: return 'primary';
        case 2: return 'danger';
        default: return 'info';
    }
};

const getPriorityLabel = (level: number) => {
     switch(level) {
        case 0: return '低';
        case 1: return '中';
        case 2: return '高';
        default: return '中';
    }
};

const submitTicket = async () => {
    if(!form.subject || !form.content) {
        ElMessage.warning('请填写完整信息');
        return;
    }
    
    submitting.value = true;
    try {
        await saveTicket({
            subject: form.subject,
            level: form.level,
            message: form.content
        });
        ElMessage.success('工单提交成功');
        dialogVisible.value = false;
        form.subject = '';
        form.content = '';
        loadTickets();
    } catch (e) {
        console.error(e);
    } finally {
        submitting.value = false;
    }
};

const handleCloseTicket = async (ticket: any) => {
    try {
        await closeTicket({ id: ticket.id });
        ElMessage.success('工单已关闭');
        loadTickets(); // Refresh list
        if (currentTicket.value && currentTicket.value.id === ticket.id) {
            currentTicket.value.status = 2; // Update detailed view state immediately
        }
    } catch (e) {
        console.error(e);
    }
};

const openDetail = async (ticket: any) => {
    currentTicket.value = ticket;
    detailDrawerVisible.value = true;
    detailLoading.value = true;
    currentMessages.value = [];
    
    try {
        const res = await fetchTickets({ id: ticket.id });
        if (res.data) {
            if (res.data.message) {
                 currentMessages.value = res.data.message;
            } else if (Array.isArray(res.data)) {
                 currentMessages.value = res.data;
            }
        }
    } catch (e) {
        ElMessage.error('无法加载工单详情');
    } finally {
        detailLoading.value = false;
    }
};

const handleReply = async () => {
    if (!replyMessage.value.trim() || !currentTicket.value) return;
    
    replying.value = true;
    try {
        await replyTicket({
            id: currentTicket.value.id,
            message: replyMessage.value
        });
        ElMessage.success('回复发送成功');
        replyMessage.value = '';
        openDetail(currentTicket.value);
    } catch (e) {
        console.error(e);
    } finally {
        replying.value = false;
    }
};
</script>
