<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
    <!-- Back to Home -->
    <el-button 
        class="absolute top-4 left-4 z-20 !bg-white/50 !backdrop-blur-sm border-none shadow-sm hover:!bg-white" 
        circle 
        @click="$router.push('/')"
    >
        <el-icon><HomeFilled /></el-icon>
    </el-button>

    <!-- Language Switcher -->
    <div class="absolute top-4 right-4 z-20">
        <el-dropdown @command="(lang: string) => locale = lang">
        <span class="el-dropdown-link flex items-center justify-center w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white shadow-sm cursor-pointer transition-colors">
            <!-- Custom Translate Icon -->
            <svg viewBox="0 0 36 36" width="20" height="20" xmlns="http://www.w3.org/2000/svg" class="text-gray-600 fill-current">
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
    </div>

    <div class="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    
    <el-card class="w-full max-w-md z-10 !rounded-2xl shadow-xl border-none">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800">{{ $t('app_name') }}</h2>
          <p class="text-sm text-gray-500 mt-2">{{ $t('register.subtitle') }}</p>
        </div>
      </template>
      
      <el-form :model="form" :rules="rules" ref="formRef" size="large">
        <el-form-item prop="email">
          <el-autocomplete
            v-model="form.email"
            :fetch-suggestions="querySearchEmail"
            placeholder="邮箱地址"
            :prefix-icon="Message"
            class="w-full"
            :trigger-on-focus="false"
          />
        </el-form-item>
        
        <el-form-item prop="email_code" class="relative">
           <div class="flex gap-2 w-full">
             <el-input v-model="form.email_code" :placeholder="$t('register.code')" :prefix-icon="Key" />
             <el-button type="primary" plain :disabled="cooldown > 0 || sendingCode" @click="sendCode">
               {{ cooldown > 0 ? `${cooldown}s` : $t('register.send_code') }}
             </el-button>
           </div>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" :placeholder="$t('login.password')" :prefix-icon="Lock" show-password />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" :placeholder="$t('register.confirm_password')" :prefix-icon="Lock" />
        </el-form-item>
        
        <el-form-item prop="invite_code">
            <el-input v-model="form.invite_code" :placeholder="$t('register.invite_code')" :prefix-icon="Ticket" />
        </el-form-item>

        <el-button type="primary" class="w-full !rounded-xl !h-12 !text-lg !font-medium" :loading="loading" @click="handleRegister">
          {{ $t('register.submit') }}
        </el-button>

        <div class="mt-6 text-center text-sm text-gray-500">
          {{ $t('register.has_account') }} 
          <router-link to="/login" class="text-blue-500 font-medium hover:underline">{{ $t('register.login') }}</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { Message, Lock, Key, Ticket, HomeFilled } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { register, sendEmailVerify, getGuestConfig } from '../../api/auth';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const formRef = ref<FormInstance>();
const loading = ref(false);
const sendingCode = ref(false);
const cooldown = ref(0);
const emailSuffixes = ref<string[]>([]);

const form = reactive({
  email: '',
  email_code: '',
  password: '',
  confirmPassword: '',
  invite_code: ''
});

onMounted(async () => {
    // Check for invite code in URL
    if (route.query.code) {
        form.invite_code = route.query.code as string;
    }
    
    // Fetch email suffixes
    try {
        const res = await getGuestConfig();
        if (res.data?.email_postfix) {
            emailSuffixes.value = res.data.email_postfix;
        }
    } catch (e) {
        console.error("Failed to load config", e);
    }
});

const querySearchEmail = (queryString: string, cb: any) => {
    const results: { value: string }[] = [];
    if (!queryString) {
        cb(results);
        return;
    }

    const atIndex = queryString.indexOf('@');
    let prefix = queryString;
    let suffixPart = '';

    if (atIndex > -1) {
        prefix = queryString.substring(0, atIndex);
        suffixPart = queryString.substring(atIndex);
    }
    
    // Only suggest if we have a prefix and suffixes list is populated
    if (prefix && emailSuffixes.value.length > 0) {
        emailSuffixes.value.forEach(suffix => {
            // If user started typing suffix, filter it. Otherwise show all.
            if (!suffixPart || suffix.startsWith(suffixPart)) {
                 results.push({ value: prefix + suffix });
            }
        });
    }

    cb(results);
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(t('login.validation.password_required')));
  } else if (value !== form.password) {
    callback(new Error(t('register.validation.password_mismatch')));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  email: [{ required: true, message: 'Please input email', trigger: 'blur' }, { type: 'email', message: 'Invalid email', trigger: 'blur' }],
  email_code: [{ required: true, message: 'Code required', trigger: 'blur' }],
  password: [{ required: true, message: 'Password required', trigger: 'blur' }, { min: 6, message: 'Min 6 chars', trigger: 'blur' }],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
});

const sendCode = async () => {
    if(!form.email) return ElMessage.warning(t('login.validation.email_required'));
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return ElMessage.warning(t('login.validation.email_format'));

    sendingCode.value = true;
    try {
        await sendEmailVerify(form.email);
        ElMessage.success(t('register.code_sent'));
        cooldown.value = 60;
        const timer = setInterval(() => {
            cooldown.value--;
            if(cooldown.value <= 0) clearInterval(timer);
        }, 1000);
    } catch (e) {
        console.error(e);
        // Error handling is mostly done in interceptor
    } finally {
        sendingCode.value = false;
    }
};

const handleRegister = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      try {
        await register(form);
        ElMessage.success(t('register.success'));
        router.push('/login');
      } catch(e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>