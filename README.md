# 永连加速器 (Yonglian Accelerator)

基于 Vue 3 + TypeScript + Element Plus + Tailwind CSS 构建的现代化 VPN 面板前端项目（适配 Xboard 后端）。

> 当前版本: **v1.0.3**

## 🚀 技术栈

- **核心框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **语言**: TypeScript
- **UI 组件库**: Element Plus (按需引入)
- **样式**: Tailwind CSS
- **状态管理**: Pinia
- **路由**: Vue Router 4 (Hash Mode)
- **国际化**: Vue I18n (支持 中/英/日/韩)
- **HTTP 请求**: Axios
- **移动端适配**: Capacitor (可选 Android/iOS 打包)

## 📂 目录结构

```text
src/
├── api/             # API 接口定义
├── assets/          # 静态资源
├── components/      # 公共组件
├── layouts/         # 布局组件 (DashboardLayout)
├── locales/         # 多语言文件 (zh-CN, en-US, ja-JP, ko-KR)
├── router/          # 路由配置
├── stores/          # Pinia 状态管理 (User Store)
├── utils/           # 工具函数 (Request, Format)
├── views/           # 页面视图
│   ├── auth/        # 登录、注册、忘记密码
│   ├── dashboard/   # 仪表盘、节点、订阅、工单、个人中心等
│   └── Home.vue     # 官网首页
├── App.vue          # 根组件
├── main.ts          # 入口文件
└── style.css        # 全局样式 & Tailwind
```

## 🛠️ 安装与运行

### 1. 环境准备
确保您的环境已安装 Node.js (推荐 v18+) 和 npm。

### 2. 安装依赖
```bash
npm install
```

### 3. 开发环境启动
```bash
npm run dev
```
访问 `http://localhost:5173` 查看效果。

### 4. 生产环境构建
```bash
npm run build
```
构建产物将输出到 `dist/` 目录。

## ✨ 功能特性

### 👤 用户中心
- **登录/注册**: 邮箱验证码注册，JWT 鉴权，自动补全邮箱后缀。
- **个人管理**: 修改密码，重置订阅信息 (UUID)，多语言切换。

### 📊 仪表盘
- **状态概览**: 查看套餐信息、余额、流量使用圆环图。
- **快捷操作**: 一键导入 Clash/Shadowrocket，复制订阅链接，二维码订阅。

### 🌍 节点列表
- **分类筛选**: 全部、高级中继、游戏专用、流媒体。
- **状态监控**: 实时显示节点在线状态、倍率、负载、国家旗帜。

### 💳 订阅管理
- **多样化套餐**: 基础、高速、极速、独享专线。
- **灵活周期**: 支持 月付、季付、年付 (5折)、两年付 (3.3折)。
- **结算中心**: 底部悬浮结算栏，实时计算总价，支持多种支付方式。
- **公益横幅**: 顶部展示公益助学文案。

### 🔧 辅助功能
- **使用教程**: Windows/iOS/Android/macOS 详细配置指南，支持搜索。
- **流量明细**: 每日流量消耗记录与图表。
- **工单系统**: 提交、查看、回复工单。
- **推广返利**: 邀请链接生成与佣金提现记录。

## 📱 移动端打包 (可选)

本项目配置了 Capacitor，可打包为 Android App。

```bash
# 构建前端资源
npm run build

# 同步资源到 Android 项目
npx cap sync

# 打开 Android Studio 进行打包
npx cap open android
```