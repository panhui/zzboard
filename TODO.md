# 开发待办事项 (TODO)

## 🔄 后端对接
- [ ] **API 集成**: 将 `src/stores/user.ts` 中的 Mock 数据替换为真实 API 调用 (`src/api/`).
- [ ] **支付接口**: 在 `Subscribe.vue` 中对接支付宝/微信支付网关。
- [ ] **鉴权机制**: 完善 Token 刷新机制 (Refresh Token) 和路由守卫。

## 🎨 界面优化
- [ ] **暗黑模式**: 适配 Element Plus 暗黑主题。
- [ ] **图表组件**: 引入 ECharts 替换目前的 CSS 简易图表，展示更详细的流量走势。
- [ ] **动画效果**: 增加页面切换转场动画。

## 📱 移动端增强
- [ ] **Haptics**: 增加震动反馈 (使用 Capacitor Haptics)。
- [ ] **状态栏**: 优化沉浸式状态栏颜色。

## ⚙️ 功能扩展
- [ ] **一键导入**: 实现从 URL Scheme 唤起本地 app (Clash/Shadowrocket)。
- [ ] **工单附件**: 支持工单上传图片/截图。
