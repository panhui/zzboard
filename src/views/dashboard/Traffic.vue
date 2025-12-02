
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">{{ $t('traffic.title') }}</h2>
        <span class="text-gray-500 text-sm">{{ $t('traffic.unit') }}</span>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <el-card class="!rounded-xl shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
            <div class="text-blue-100 mb-1">今日流量</div>
            <div class="text-3xl font-bold">1.24 GB</div>
        </el-card>
         <el-card class="!rounded-xl shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
            <div class="text-purple-100 mb-1">过去7天</div>
            <div class="text-3xl font-bold">12.8 GB</div>
        </el-card>
         <el-card class="!rounded-xl shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
             <div class="text-green-100 mb-1">过去30天</div>
            <div class="text-3xl font-bold">45.5 GB</div>
        </el-card>
    </div>

    <!-- Simple Bar Chart Visualization (CSS based for simplicity) -->
    <el-card class="!rounded-xl shadow-sm" header="流量趋势 (近7天)">
        <div class="h-48 flex items-end justify-between gap-2 px-4 pb-2">
            <div v-for="(day, index) in chartData" :key="index" class="flex flex-col items-center w-full group">
                <el-tooltip :content="day.val + ' GB'" placement="top">
                    <div 
                        class="w-full max-w-[40px] bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all cursor-pointer relative"
                        :style="{ height: (day.val / 5) * 100 + '%' }" 
                    ></div>
                </el-tooltip>
                <span class="text-xs text-gray-500 mt-2">{{ day.date }}</span>
            </div>
        </div>
    </el-card>

    <!-- Table -->
    <el-card class="!rounded-xl shadow-sm">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" :label="$t('traffic.date')" width="180" />
            <el-table-column prop="u" :label="$t('traffic.upload')" />
            <el-table-column prop="d" :label="$t('traffic.download')" />
            <el-table-column prop="total" :label="$t('traffic.total')" />
        </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const chartData = ref([
    { date: '11-01', val: 1.2 },
    { date: '11-02', val: 2.5 },
    { date: '11-03', val: 0.8 },
    { date: '11-04', val: 3.1 },
    { date: '11-05', val: 1.5 },
    { date: '11-06', val: 2.2 },
    { date: '11-07', val: 1.24 },
]);

const tableData = ref([
    { date: '2023-11-07', u: '124 MB', d: '1.12 GB', total: '1.24 GB' },
    { date: '2023-11-06', u: '200 MB', d: '2.00 GB', total: '2.20 GB' },
    { date: '2023-11-05', u: '150 MB', d: '1.35 GB', total: '1.50 GB' },
    { date: '2023-11-04', u: '310 MB', d: '2.79 GB', total: '3.10 GB' },
    { date: '2023-11-03', u: '80 MB', d: '720 MB', total: '0.80 GB' },
]);
</script>
