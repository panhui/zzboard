
<template>
  <div class="space-y-6 pb-24"> <!-- Padding bottom to prevent content being hidden by fixed footer -->
    
    <!-- Charity Banner (Beautified) -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-orange-400 p-6 shadow-lg shadow-rose-100 mb-6 md:mb-10 group">
       <!-- Decorative background blobs -->
       <div class="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white opacity-20 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
       <div class="absolute -left-6 -bottom-6 h-32 w-32 rounded-full bg-white opacity-20 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
       
       <div class="relative z-10 flex flex-row items-center justify-center gap-4 md:gap-6">
           <!-- Hands Holding Heart Icon -->
           <div class="flex-shrink-0 p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-md shadow-inner border border-white/30 relative">
                <!-- Glow effect -->
                <div class="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                <!-- Composite SVG for Hands Holding Heart -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 md:w-10 md:h-10 text-white relative z-10 drop-shadow-md">
                    <!-- Heart -->
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
           </div>

           <div class="text-left">
               <p class="text-[1.1rem] md:text-[1.8rem] leading-tight font-bold text-white tracking-wide no-underline drop-shadow-sm">
                   {{ $t('subscribe.charity_banner') }}
               </p>
           </div>
       </div>
    </div>

    <!-- Cycle Switcher (Custom Design - Responsive & Beautified) -->
    <div class="flex justify-center mb-10 md:mb-14 mt-4">
      <div class="bg-gray-100 p-1 md:p-1.5 rounded-xl md:rounded-2xl grid grid-cols-4 w-full md:w-auto md:flex gap-1 md:gap-2 shadow-inner border border-gray-200">
        <button
            v-for="cycle in cyclesList"
            :key="cycle.value"
            @click="billingCycle = cycle.value"
            class="relative px-1 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl text-xs md:text-lg font-bold transition-all duration-300 md:min-w-[150px] flex items-center justify-center gap-1 md:gap-2"
            :class="billingCycle === cycle.value 
                ? 'bg-white text-blue-600 shadow-sm md:shadow-xl shadow-blue-500/10 ring-1 md:ring-2 ring-blue-500 z-10' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'"
        >
            <!-- Semantic Icons for Cycles -->
            <el-icon v-if="cycle.value === 'monthly'" :size="18" :class="billingCycle === 'monthly' ? 'text-blue-500' : 'text-gray-400'"><Calendar /></el-icon>
            <el-icon v-if="cycle.value === 'quarterly'" :size="18" :class="billingCycle === 'quarterly' ? 'text-blue-500' : 'text-gray-400'"><PieChart /></el-icon>
            <el-icon v-if="cycle.value === 'yearly'" :size="18" :class="billingCycle === 'yearly' ? 'text-blue-500' : 'text-gray-400'"><Trophy /></el-icon>
            <el-icon v-if="cycle.value === 'biennial'" :size="18" :class="billingCycle === 'biennial' ? 'text-blue-500' : 'text-gray-400'"><Medal /></el-icon>

            <span class="whitespace-nowrap">{{ $t(`subscribe.cycles.${cycle.value}`) }}</span>
            
            <!-- Discount Badge (Optimized) -->
            <span v-if="cycle.discount" 
                  class="absolute -top-1.5 -right-1 md:-top-3 md:-right-2 px-1 py-0.5 md:px-2 md:py-0.5 rounded-full text-[0.55rem] md:text-xs font-extrabold text-white shadow-sm md:shadow-md flex items-center z-20 border md:border-2 border-gray-100 scale-90 md:scale-100"
                  :class="cycle.discountColor">
                {{ $t(cycle.discountKey || '') }}
            </span>
        </button>
      </div>
    </div>

    <!-- Plans Grid (Compact on mobile) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pt-4">
      <div 
        v-for="plan in plans" 
        :key="plan.key"
        @click="selectPlan(plan.key)"
        class="cursor-pointer relative transition-all duration-300 transform rounded-xl md:rounded-2xl bg-white border flex flex-col mt-4 md:mt-0"
        :class="[
            selectedPlan === plan.key 
                ? 'ring-1 md:ring-2 ring-blue-500 shadow-lg md:shadow-xl scale-[1.01] md:scale-[1.02] border-blue-500 z-10' 
                : 'ring-1 ring-gray-100 border-gray-100 hover:shadow-lg hover:-translate-y-1'
        ]"
      >
          <!-- Popular Badge (No Border) -->
          <div v-if="plan.popular" class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-600 text-white px-6 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-widest shadow-lg shadow-orange-500/40 z-20 flex items-center justify-center gap-1.5 whitespace-nowrap min-w-[140px]">
             <el-icon class="animate-pulse"><Trophy /></el-icon>
             <span>{{ $t('subscribe.popular') }}</span>
          </div>

          <!-- Checkmark for Selected -->
          <div v-if="selectedPlan === plan.key" class="absolute top-2 right-2 md:top-3 md:right-3 text-blue-500 bg-blue-50 rounded-full p-0.5 md:p-1">
              <el-icon :size="16"><SelectIcon /></el-icon>
          </div>

          <!-- Header -->
          <div class="text-center p-3 md:p-6 border-b border-gray-50 pt-8 md:pt-10">
             <h3 class="text-sm md:text-xl font-bold truncate" :class="plan.colorClass">{{ $t(`subscribe.plans.${plan.key}`) }}</h3>
             <div class="mt-3 md:mt-5 flex flex-col items-center justify-center">
               <div class="flex items-baseline justify-center">
                   <span class="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight">¥{{ getMonthlyPrice(plan.key) }}</span>
                   <span class="text-sm md:text-lg font-semibold text-gray-500 ml-1">/ {{ $t('subscribe.unit.month') }}</span>
               </div>
             </div>
          </div>

          <!-- Features -->
          <div class="p-3 md:p-6 space-y-2 md:space-y-4 flex-1 bg-gray-50/30 rounded-b-xl md:rounded-b-2xl">
             <div v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                <el-icon class="text-green-500 mt-0.5 flex-shrink-0 text-xs md:text-sm"><Check /></el-icon> 
                <span class="leading-tight">{{ $t(feature.key, feature.params) }}</span>
             </div>
          </div>
      </div>
    </div>

    <!-- Fixed Checkout Footer (Optimized Layout) -->
    <div class="fixed bottom-0 right-0 bg-white border-t border-gray-200 p-3 md:p-4 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.08)] z-40 transition-all duration-300 left-0 md:left-[240px]">
        <div class="max-w-7xl mx-auto flex flex-row justify-between items-center gap-4">
            <div class="flex flex-col justify-center">
                <!-- Main Info Line -->
                <div class="flex items-baseline gap-2 md:gap-3 flex-wrap">
                    <span class="text-gray-500 text-sm hidden md:inline">{{ $t('subscribe.checkout.selected') }}:</span>
                    <span class="font-bold text-gray-800 text-sm md:text-lg">{{ $t(`subscribe.plans.${selectedPlan}`) }}</span>
                    <el-tag size="small" type="info" class="!text-gray-600">{{ $t(`subscribe.cycles.${billingCycle}`) }}</el-tag>
                    <span class="ml-1 md:ml-3 text-gray-500 text-xs md:text-sm">{{ $t('subscribe.checkout.total') }}:</span>
                    <span class="text-xl md:text-2xl font-bold text-blue-600">¥{{ getPrice(selectedPlan) }}</span>
                </div>
            </div>
            
            <el-button 
                type="primary" 
                size="large" 
                class="!px-6 md:!px-12 !h-10 md:!h-12 !rounded-xl !text-base md:!text-lg !font-bold shadow-blue-500/30 shadow-lg animate-breath" 
                :loading="loading"
                @click="handleCheckout"
            >
                {{ $t('subscribe.checkout.pay') }}
            </el-button>
        </div>
    </div>

    <!-- Payment & Order Detail Dialog (Unified with Orders.vue) -->
    <el-dialog v-model="paymentDialogVisible" title="订单详情" width="500px" class="rounded-xl" :close-on-click-modal="false">
        <div v-if="currentOrder" class="space-y-6">
            <!-- Order Info Grid -->
            <div class="grid grid-cols-2 gap-4 text-sm border-b pb-6">
                <div class="text-gray-500">订单编号:</div>
                <div class="font-mono">{{ currentOrder.trade_no }}</div>
                
                <div class="text-gray-500">商品名称:</div>
                <div>{{ currentOrder.plan?.name }} ({{ getPeriodLabel(currentOrder.period) }})</div>

                <div class="text-gray-500">订单金额:</div>
                <div class="text-lg font-bold text-blue-600">¥{{ (currentOrder.total_amount / 100).toFixed(2) }}</div>
                
                <!-- Extra Payment Info -->
                <template v-if="currentOrder.balance_amount && currentOrder.balance_amount > 0">
                    <div class="text-gray-500">{{ $t('orders.balance_payment') }}:</div>
                    <div class="text-gray-800">¥{{ (currentOrder.balance_amount / 100).toFixed(2) }}</div>
                </template>

                <template v-if="currentOrder.surplus_amount && currentOrder.surplus_amount > 0">
                    <div class="text-gray-500">{{ $t('orders.deduction') }}:</div>
                    <div class="text-green-600">- ¥{{ (currentOrder.surplus_amount / 100).toFixed(2) }}</div>
                </template>

                <template v-if="currentOrder.refund_amount && currentOrder.refund_amount > 0">
                    <div class="text-gray-500">{{ $t('orders.refund') }}:</div>
                    <div class="text-orange-600">¥{{ (currentOrder.refund_amount / 100).toFixed(2) }}</div>
                </template>

                <div class="text-gray-500">创建时间:</div>
                <div>{{ new Date(currentOrder.created_at * 1000).toLocaleString() }}</div>
                
                <div class="text-gray-500">订单状态:</div>
                <div>
                    <el-tag :type="getStatusType(currentOrder.status)">{{ getStatusLabel(currentOrder.status) }}</el-tag>
                </div>
                
                <template v-if="currentOrder.callback_no">
                     <div class="text-gray-500">支付流水号:</div>
                     <div class="font-mono text-xs">{{ currentOrder.callback_no }}</div>
                </template>
            </div>

            <!-- Payment Methods -->
            <div class="space-y-3" v-if="currentOrder.status === 0">
                <h3 class="font-bold text-gray-700">选择支付方式</h3>
                <div v-if="paymentMethods.length > 0" class="grid grid-cols-2 gap-3">
                    <div 
                        v-for="method in paymentMethods" 
                        :key="method.id"
                        class="border rounded-lg p-3 cursor-pointer flex items-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
                        :class="selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'"
                        @click="selectedPaymentMethod = method.id"
                    >
                        <el-icon class="text-blue-500" :size="24"><CreditCard /></el-icon>
                        <span class="font-medium">{{ method.name }}</span>
                    </div>
                </div>
                <div v-else class="text-center text-gray-400 py-4">
                    <el-icon class="is-loading"><Loading /></el-icon> 正在加载支付方式...
                </div>
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-3">
                <el-button @click="paymentDialogVisible = false">稍后支付</el-button>
                <el-button 
                    v-if="currentOrder && currentOrder.status === 0"
                    type="primary" 
                    :loading="processingPayment"
                    :disabled="!selectedPaymentMethod"
                    @click="executePayment"
                >
                    立即支付 ¥{{ (currentOrder.total_amount / 100).toFixed(2) }}
                </el-button>
            </div>
        </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
    Check, Select as SelectIcon, CreditCard, Loading, Calendar, PieChart, Trophy, Medal, CircleCheck
} from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { saveOrder, getPaymentMethods, checkoutOrder, fetchOrderDetail } from '../../api/auth';

const { t } = useI18n();
const router = useRouter();
const loading = ref(false);

// Payment Logic
const paymentDialogVisible = ref(false);
const processingPayment = ref(false);
const paymentMethods = ref<any[]>([]);
const selectedPaymentMethod = ref<number | null>(null);
const currentOrder = ref<any>(null);

type BillingCycle = 'monthly' | 'quarterly' | 'yearly' | 'biennial';
type PlanType = 'standard' | 'premium' | 'business' | 'ultimate';

interface CycleOption {
    value: BillingCycle;
    discount?: boolean;
    discountKey?: string;
    discountColor?: string;
}

const billingCycle = ref<BillingCycle>('biennial');
const selectedPlan = ref<PlanType>('business');

const pricing: Record<PlanType, Record<BillingCycle, number>> = {
    standard: { // Basic Plan
        monthly: 18,
        quarterly: 42,
        yearly: 108,
        biennial: 144
    },
    premium: { // High-Speed Plan
        monthly: 38,
        quarterly: 93,
        yearly: 228,
        biennial: 312
    },
    business: { // Extreme Speed Plan
        monthly: 58,
        quarterly: 141,
        yearly: 348,
        biennial: 456
    },
    ultimate: { // Exclusive Line
        monthly: 198,
        quarterly: 477,
        yearly: 1188,
        biennial: 1632
    }
};

const cyclesList: CycleOption[] = [
    { value: 'monthly' },
    { value: 'quarterly' },
    { 
        value: 'yearly',
        discount: true, 
        discountKey: 'subscribe.discount_50', 
        discountColor: 'bg-red-500' 
    },
    { 
        value: 'biennial', 
        discount: true, 
        discountKey: 'subscribe.discount_33', 
        discountColor: 'bg-gradient-to-r from-orange-500 to-red-500' 
    }
];

interface PlanConfig {
    key: PlanType;
    id: number;
    popular?: boolean;
    colorClass: string;
    features: Array<{ key: string; params?: any }>;
}

const plans: PlanConfig[] = [
    {
        key: 'standard', // 基础套餐: 50G, 10M
        id: 1,
        colorClass: 'text-gray-600',
        features: [
            { key: 'subscribe.features.traffic', params: { amount: '50GB' } },
            { key: 'subscribe.features.speed', params: { limit: '10Mbps' } },
            { key: 'subscribe.features.devices', params: { count: 2 } },
            { key: 'subscribe.features.nodes_standard' }
        ]
    },
    {
        key: 'premium', // 高速套餐: 200G, 30M
        id: 2,
        colorClass: 'text-blue-600',
        features: [
            { key: 'subscribe.features.traffic', params: { amount: '200GB' } },
            { key: 'subscribe.features.speed', params: { limit: '30Mbps' } },
            { key: 'subscribe.features.devices', params: { count: 5 } },
            { key: 'subscribe.features.nodes_global' },
            { key: 'subscribe.features.iepl' }
        ]
    },
    {
        key: 'business', // 极速套餐: 1000G, 100M
        id: 3,
        popular: true,
        colorClass: 'text-purple-600',
        features: [
            { key: 'subscribe.features.traffic', params: { amount: '1000GB' } },
             { key: 'subscribe.features.speed', params: { limit: '100Mbps' } },
            { key: 'subscribe.features.devices', params: { count: 10 } },
            { key: 'subscribe.features.nodes_global' },
            { key: 'subscribe.features.iepl' }
        ]
    },
    {
        key: 'ultimate', // 独享专线: 10T, 1000M
        id: 4,
        colorClass: 'text-orange-600',
        features: [
            { key: 'subscribe.features.traffic', params: { amount: '10TB' } },
            { key: 'subscribe.features.speed', params: { limit: '1000Mbps' } },
            { key: 'subscribe.features.unlimited_devices' },
            { key: 'subscribe.features.ip' },
            { key: 'subscribe.features.priority' }
        ]
    }
];

const selectPlan = (key: PlanType) => {
    selectedPlan.value = key;
};

const getPrice = (plan: PlanType) => {
    return pricing[plan][billingCycle.value];
};

const getMonthlyPrice = (planKey: PlanType) => {
    const total = pricing[planKey][billingCycle.value];
    const monthsMap: Record<BillingCycle, number> = {
        monthly: 1,
        quarterly: 3,
        yearly: 12,
        biennial: 24
    };
    return Math.floor(total / monthsMap[billingCycle.value]);
};

// Utils for Dialog (Same as Orders.vue)
const getStatusType = (status: number) => {
    switch(status) {
        case 0: return 'warning'; // 待支付
        case 1: return 'warning'; // 开通中
        case 2: return 'info';    // 已取消
        case 3: return 'success'; // 已完成
        case 4: return 'primary'; // 已折抵
        default: return 'info';
    }
};

const getStatusLabel = (status: number) => {
    switch(status) {
        case 0: return t('orders.unpaid');
        case 1: return '处理中';
        case 2: return '已取消';
        case 3: return t('orders.paid');
        case 4: return t('orders.discounted');
        default: return '未知';
    }
};

const getPeriodLabel = (period: string) => {
    const map: Record<string, string> = {
        month: t('subscribe.unit.month'),
        quarter: t('subscribe.unit.quarter'),
        year: t('subscribe.unit.year'),
        two_year: t('subscribe.unit.two_years'),
        month_price: t('subscribe.unit.month'),
        quarter_price: t('subscribe.unit.quarter'),
        year_price: t('subscribe.unit.year'),
        two_year_price: t('subscribe.unit.two_years')
    };
    return map[period] || period;
};

const handleCheckout = async () => {
    // Map billing cycle to backend API period parameter
    const periodMap: Record<BillingCycle, string> = {
        monthly: 'month_price',
        quarterly: 'quarter_price',
        yearly: 'year_price',
        biennial: 'two_year_price'
    };
    
    const selectedPlanConfig = plans.find(p => p.key === selectedPlan.value);
    
    if (!selectedPlanConfig) {
        ElMessage.error('Invalid plan selected');
        return;
    }

    const payload = {
        plan_id: selectedPlanConfig.id,
        period: periodMap[billingCycle.value]
    };

    loading.value = true;
    paymentMethods.value = [];
    selectedPaymentMethod.value = null;
    currentOrder.value = null;

    try {
        // 1. Create Order
        const res: any = await saveOrder(payload);
        const tradeNo = typeof res.data === 'string' ? res.data : res.data?.trade_no;

        if (!tradeNo) {
            throw new Error("Order created but no trade number returned");
        }

        // 2. Fetch Full Order Details for consistent display
        const detailRes = await fetchOrderDetail({ trade_no: tradeNo });
        if (detailRes.data) {
            currentOrder.value = detailRes.data;
        } else {
            // Fallback (minimal info) if detail fetch fails
             currentOrder.value = {
                trade_no: tradeNo,
                total_amount: getPrice(selectedPlan.value) * 100,
                plan: { name: t(`subscribe.plans.${selectedPlan.value}`) },
                period: billingCycle.value,
                created_at: Math.floor(Date.now() / 1000),
                status: 0
             };
        }

        // 3. Open Dialog
        paymentDialogVisible.value = true;

        // 4. Fetch Payment Methods
        const methodsRes = await getPaymentMethods();
        if (methodsRes.data && Array.isArray(methodsRes.data)) {
            paymentMethods.value = methodsRes.data;
            if (paymentMethods.value.length > 0) {
                selectedPaymentMethod.value = paymentMethods.value[0].id;
            }
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('订单创建失败，请重试');
    } finally {
        loading.value = false;
    }
};

const executePayment = async () => {
    if (!selectedPaymentMethod.value || !currentOrder.value.trade_no) return;
    
    processingPayment.value = true;
    try {
        const res = await checkoutOrder({
            trade_no: currentOrder.value.trade_no,
            method: selectedPaymentMethod.value
        });
        
        // Handle redirect
        if (typeof res.data === 'string' && (res.data.startsWith('http') || res.data.startsWith('/'))) {
             window.location.href = res.data;
        } else if (res.data === true) {
             ElMessage.success('支付成功');
             router.push('/dashboard/orders');
        } else if (res.data?.url) {
             window.location.href = res.data.url;
        } else {
             ElMessage.info('请前往支付页面完成支付');
             router.push('/dashboard/orders');
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('发起支付失败');
    } finally {
        processingPayment.value = false;
    }
};
</script>

<style scoped>
@keyframes breath {
  0% {
    transform: scale(1);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1);
  }
}
.animate-breath {
  animation: breath 2s infinite ease-in-out;
}
</style>
