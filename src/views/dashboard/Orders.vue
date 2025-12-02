
<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold mb-4">{{ $t('orders.title') }}</h2>
    
    <el-card class="!rounded-xl shadow-sm" v-loading="loading">
      <el-table :data="orders" style="width: 100%" stripe>
        <el-table-column prop="trade_no" :label="$t('orders.id')" min-width="180" />
        
        <el-table-column prop="created_at" :label="$t('orders.date')" width="180">
            <template #default="scope">
                {{ new Date(scope.row.created_at * 1000).toLocaleString() }}
            </template>
        </el-table-column>
        
        <el-table-column prop="plan.name" :label="$t('orders.plan')" min-width="150">
             <template #default="scope">
                 {{ scope.row.plan ? scope.row.plan.name : 'Unknown Plan' }}
                 <span v-if="scope.row.period" class="text-xs text-gray-400 ml-1">({{ getPeriodLabel(scope.row.period) }})</span>
             </template>
        </el-table-column>
        
        <el-table-column prop="total_amount" :label="$t('orders.amount')" width="120">
            <template #default="scope">
                <span class="font-medium text-gray-700">¥{{ (scope.row.total_amount / 100).toFixed(2) }}</span>
            </template>
        </el-table-column>
        
        <el-table-column prop="status" :label="$t('orders.status')" width="100">
           <template #default="scope">
               <el-tag :type="getStatusType(scope.row.status)">{{ getStatusLabel(scope.row.status) }}</el-tag>
           </template>
        </el-table-column>

        <el-table-column label="操作" width="160" fixed="right">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="viewDetail(scope.row)">
                    详情
                </el-button>
                
                <el-button v-if="scope.row.status === 0" type="primary" size="small" link @click="viewDetail(scope.row)">
                    去支付
                </el-button>

                <el-popconfirm 
                    v-if="scope.row.status === 0"
                    title="确定取消该订单吗？" 
                    @confirm="handleCancel(scope.row)"
                >
                    <template #reference>
                        <el-button link type="danger" size="small">取消</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
      </el-table>

      <div v-if="orders.length === 0 && !loading" class="text-center py-10 text-gray-400">
          暂无订单记录
      </div>
    </el-card>

    <!-- Order Detail Dialog -->
    <el-dialog v-model="detailVisible" title="订单详情" width="500px" class="rounded-xl">
        <div v-if="currentOrder" class="space-y-6" v-loading="detailLoading">
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

            <!-- Payment Method Selection (Only for Unpaid) -->
            <div v-if="currentOrder.status === 0" class="space-y-3">
                <h3 class="font-bold text-gray-700">选择支付方式</h3>
                <div v-if="paymentMethods.length > 0" class="grid grid-cols-2 gap-3">
                    <div 
                        v-for="method in paymentMethods" 
                        :key="method.id"
                        class="border rounded-lg p-3 cursor-pointer flex items-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
                        :class="selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'"
                        @click="selectedPaymentMethod = method.id"
                    >
                        <el-icon v-if="method.icon" :size="24">
                           <!-- Dynamic icon mapping could go here, generic for now -->
                           <CreditCard />
                        </el-icon>
                        <span class="font-medium">{{ method.name }}</span>
                    </div>
                </div>
                <div v-else class="text-gray-400 text-sm text-center py-2">
                    正在加载支付方式...
                </div>

                <el-button 
                    type="primary" 
                    class="w-full !h-10 mt-4 !rounded-lg !text-base" 
                    :loading="paying"
                    :disabled="!selectedPaymentMethod"
                    @click="handleCheckout"
                >
                    立即支付 ¥{{ (currentOrder.total_amount / 100).toFixed(2) }}
                </el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchOrders, fetchOrderDetail, cancelOrder, getPaymentMethods, checkoutOrder } from '../../api/auth';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { CreditCard } from '@element-plus/icons-vue';

const { t } = useI18n();
const loading = ref(true);
const orders = ref<any[]>([]);

// Detail view
const detailVisible = ref(false);
const detailLoading = ref(false);
const currentOrder = ref<any>(null);

// Payment
const paymentMethods = ref<any[]>([]);
const selectedPaymentMethod = ref<number | null>(null);
const paying = ref(false);

onMounted(async () => {
    loadOrders();
});

const loadOrders = async () => {
    try {
        const res = await fetchOrders();
        if (res.data) {
            orders.value = res.data;
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('获取订单记录失败');
    } finally {
        loading.value = false;
    }
};

const getStatusType = (status: number) => {
    switch(status) {
        case 0: return 'warning'; // 待支付
        case 1: return 'warning'; // 开通中 (Callback pending)
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

const viewDetail = async (order: any) => {
    detailVisible.value = true;
    detailLoading.value = true;
    currentOrder.value = null; 
    selectedPaymentMethod.value = null;
    paymentMethods.value = [];
    
    try {
        // Fetch fresh details
        const res = await fetchOrderDetail({ trade_no: order.trade_no });
        if (res.data) {
            currentOrder.value = res.data;
        } else {
             currentOrder.value = order;
        }

        // If unpaid, fetch payment methods
        if (currentOrder.value.status === 0) {
            const methodRes = await getPaymentMethods();
            if (methodRes.data) {
                paymentMethods.value = methodRes.data;
                // Auto select first one
                if (paymentMethods.value.length > 0) {
                    selectedPaymentMethod.value = paymentMethods.value[0].id;
                }
            }
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('获取详情失败');
        currentOrder.value = order; 
    } finally {
        detailLoading.value = false;
    }
};

const handleCancel = async (order: any) => {
    try {
        await cancelOrder({ trade_no: order.trade_no });
        ElMessage.success('订单已取消');
        loadOrders(); // Refresh list
        if (currentOrder.value && currentOrder.value.trade_no === order.trade_no) {
            currentOrder.value.status = 2; // Update detail view immediately
        }
    } catch (e) {
        console.error(e);
    }
};

const handleCheckout = async () => {
    if (!selectedPaymentMethod.value || !currentOrder.value) return;
    
    paying.value = true;
    try {
        const res = await checkoutOrder({
            trade_no: currentOrder.value.trade_no,
            method: selectedPaymentMethod.value
        });
        
        // Usually checkout returns a redirect URL or HTML form in data
        // Xboard generic behavior:
        if (typeof res.data === 'string' && (res.data.startsWith('http') || res.data.startsWith('/'))) {
             window.location.href = res.data;
        } else if (res.data === true) {
             ElMessage.success('支付成功');
             location.reload();
        } else {
             // Sometimes it returns JSON with url field
             if (res.data?.url) {
                 window.location.href = res.data.url;
             } else {
                 ElMessage.info('请前往支付页面完成支付');
             }
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('发起支付失败');
    } finally {
        paying.value = false;
    }
};
</script>
