
<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-gray-800">{{ $t('invite.title') }}</h2>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <el-card class="!rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-gray-500 mb-2">{{ $t('invite.total_commission') }}</div>
            <div class="text-3xl font-bold text-orange-500">¥ 125.00</div>
        </el-card>
        <el-card class="!rounded-xl shadow-sm hover:shadow-md transition-shadow">
             <div class="flex justify-between items-center">
                 <div>
                    <div class="text-gray-500 mb-2">{{ $t('invite.available_commission') }}</div>
                    <div class="text-3xl font-bold text-green-500">¥ 45.00</div>
                 </div>
                 <el-button type="primary" size="small" plain>{{ $t('invite.withdraw') }}</el-button>
             </div>
        </el-card>
        <el-card class="!rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-gray-500 mb-2">{{ $t('invite.invite_count') }}</div>
            <div class="text-3xl font-bold text-blue-500">12</div>
        </el-card>
    </div>

    <!-- Link -->
    <el-card class="!rounded-xl shadow-sm" header="邀请链接">
        <div class="flex gap-4">
            <el-input v-model="inviteLink" readonly :placeholder="$t('invite.link_placeholder')" />
            <el-button type="primary" @click="copyLink">
                <el-icon class="mr-1"><CopyDocument /></el-icon> {{ $t('invite.copy_link') }}
            </el-button>
        </div>
        <div class="mt-4 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
            <p>说明：</p>
            <ul class="list-disc list-inside mt-1 space-y-1">
                <li>邀请好友注册并购买套餐，您将获得消费金额 20% 的返利。</li>
                <li>佣金满 ¥100 可申请提现至支付宝。</li>
            </ul>
        </div>
    </el-card>

    <!-- Records -->
    <el-card class="!rounded-xl shadow-sm" :header="$t('invite.records')">
         <el-table :data="records" style="width: 100%">
            <el-table-column prop="user" :label="$t('invite.user')" />
            <el-table-column prop="amount" :label="$t('invite.reward')">
                <template #default="scope">
                    <span class="text-green-600">+ ¥{{ scope.row.amount }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="time" :label="$t('invite.time')" />
         </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CopyDocument } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const inviteLink = ref('https://yonglian.io/register?code=x82js');

const records = ref([
    { user: 'u***1@gmail.com', amount: '11.60', time: '2023-11-05 12:00' },
    { user: 't***9@qq.com', amount: '7.60', time: '2023-11-02 09:30' },
    { user: 'a***b@outlook.com', amount: '39.60', time: '2023-10-28 15:45' },
]);

const copyLink = () => {
    navigator.clipboard.writeText(inviteLink.value);
    ElMessage.success('邀请链接已复制');
};
</script>
