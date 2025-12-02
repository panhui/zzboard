
<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- User Summary Card -->
    <div class="relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-gray-100 group">
        <!-- Background Decor -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <el-avatar :size="80" class="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold shadow-lg shadow-blue-500/20">
                {{ (userStore.userInfo.email?.[0] || 'U').toUpperCase() }}
            </el-avatar>
            <div class="text-center md:text-left flex-1">
                <h2 class="text-2xl font-bold text-gray-800">{{ userStore.userInfo.email }}</h2>
                <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                    <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 flex items-center gap-1">
                        <el-icon><User /></el-icon> {{ $t('menu.user_role') }}
                    </span>
                    <span class="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100 flex items-center gap-1" v-if="userStore.userInfo.planName">
                        <el-icon><Trophy /></el-icon> {{ userStore.userInfo.planName }}
                    </span>
                </div>
            </div>
            <!-- Quick UUID Copy -->
            <div class="hidden md:block">
                 <el-button round class="!bg-white/80 !backdrop-blur-sm hover:!bg-white hover:!shadow-md transition-all" @click="copyUuid">
                     <el-icon class="mr-2"><CopyDocument /></el-icon> 复制 UUID
                 </el-button>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Change Password -->
        <el-card class="!rounded-2xl shadow-sm border-none ring-1 ring-gray-100 h-full">
            <template #header>
                <div class="flex items-center gap-3 pb-2 border-b border-gray-50">
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <el-icon :size="20"><Lock /></el-icon>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg">{{ $t('profile.security') }}</h3>
                        <p class="text-xs text-gray-400">定期修改密码以保护账号安全</p>
                    </div>
                </div>
            </template>
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-position="top" size="large" class="mt-2">
                <el-form-item :label="$t('profile.current_password')" prop="current_password">
                    <el-input v-model="passwordForm.current_password" type="password" show-password prefix-icon="Key" placeholder="请输入当前密码" />
                </el-form-item>
                <el-form-item :label="$t('profile.new_password')" prop="new_password">
                    <el-input v-model="passwordForm.new_password" type="password" show-password prefix-icon="Lock" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item :label="$t('profile.confirm_password')" prop="confirm_password">
                    <el-input v-model="passwordForm.confirm_password" type="password" show-password prefix-icon="CircleCheck" placeholder="请再次输入新密码" />
                </el-form-item>
                <div class="pt-4">
                    <el-button type="primary" class="w-full !rounded-xl !h-12 !font-bold shadow-lg shadow-blue-500/20" @click="handleChangePassword" :loading="passwordLoading">
                        {{ $t('profile.save') }}
                    </el-button>
                </div>
            </el-form>
        </el-card>

        <!-- Subscription Config -->
        <el-card class="!rounded-2xl shadow-sm border-none ring-1 ring-gray-100 h-full flex flex-col">
             <template #header>
                <div class="flex items-center gap-3 pb-2 border-b border-gray-50">
                    <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                        <el-icon :size="20"><Setting /></el-icon>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg">{{ $t('profile.subscription') }}</h3>
                        <p class="text-xs text-gray-400">管理您的订阅连接和接口信息</p>
                    </div>
                </div>
            </template>
            
            <div class="flex flex-col h-full justify-between py-4">
                 <div class="bg-red-50/50 text-gray-600 p-5 rounded-2xl text-sm border border-red-100 flex items-start gap-4">
                     <div class="p-2 bg-red-100 text-red-500 rounded-lg flex-shrink-0">
                         <el-icon class="text-lg"><Warning /></el-icon>
                     </div>
                     <div class="space-y-2">
                         <h4 class="font-bold text-red-600">重置操作说明</h4>
                         <p class="leading-relaxed">{{ $t('profile.reset_warning') }}</p>
                     </div>
                 </div>

                 <div class="flex justify-center pt-8 pb-4">
                     <el-popconfirm
                        :title="$t('profile.reset_warning')"
                        confirm-button-text="确认重置"
                        cancel-button-text="取消"
                        confirm-button-type="danger"
                        width="260"
                        @confirm="handleResetSecurity"
                     >
                        <template #reference>
                            <el-button type="danger" plain size="large" class="!w-full !h-12 !rounded-xl !font-bold !bg-red-50 hover:!bg-red-100 !border-red-200" :loading="resetLoading">
                                <el-icon class="mr-2"><RefreshRight /></el-icon>
                                {{ $t('profile.reset_btn') }}
                            </el-button>
                        </template>
                     </el-popconfirm>
                 </div>
            </div>
        </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Lock, Setting, Warning, User, Trophy, Key, CircleCheck, RefreshRight, CopyDocument } from '@element-plus/icons-vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { updatePassword, resetSecurity } from '../../api/auth';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '../../stores/user';

const { t } = useI18n();
const userStore = useUserStore();

// Password Change
const passwordFormRef = ref<FormInstance>();
const passwordLoading = ref(false);
const passwordForm = reactive({
    current_password: '',
    new_password: '',
    confirm_password: ''
});

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== passwordForm.new_password) {
    callback(new Error(t('register.validation.password_mismatch')));
  } else {
    callback();
  }
};

const passwordRules = reactive<FormRules>({
    current_password: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
    new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, message: '密码长度至少6位', trigger: 'blur' }],
    confirm_password: [{ validator: validatePass2, trigger: 'blur' }]
});

const handleChangePassword = async () => {
    if (!passwordFormRef.value) return;
    await passwordFormRef.value.validate(async (valid) => {
        if (valid) {
            passwordLoading.value = true;
            try {
                await updatePassword({
                    current_password: passwordForm.current_password,
                    new_password: passwordForm.new_password
                });
                ElMessage.success(t('profile.password_success'));
                passwordForm.current_password = '';
                passwordForm.new_password = '';
                passwordForm.confirm_password = '';
            } catch (e) {
                console.error(e);
            } finally {
                passwordLoading.value = false;
            }
        }
    });
};

// Reset Security
const resetLoading = ref(false);

const handleResetSecurity = async () => {
    resetLoading.value = true;
    try {
        await resetSecurity();
        ElMessage.success(t('profile.reset_success'));
        // Refresh user info to get new sub link
        await userStore.fetchUserInfo();
    } catch (e) {
        console.error(e);
    } finally {
        resetLoading.value = false;
    }
};

const copyUuid = () => {
    // Assuming subscribe URL contains the UUID or token, but for now we don't have explicit UUID in store
    // So we just copy the subscribe URL which effectively acts as the key identifier
    const url = userStore.userInfo.subscribeUrl;
    if (url) {
        // Simple extraction logic if UUID is part of URL, otherwise copy full URL or email
        navigator.clipboard.writeText(url);
        ElMessage.success('订阅信息已复制');
    } else {
        ElMessage.warning('暂无订阅信息');
    }
};
</script>
