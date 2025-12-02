import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import messages from './locales';
import 'element-plus/dist/index.css';
import './style.css';

const app = createApp(App);

// Setup i18n
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  globalInjection: true, // Allow usage of $t in templates
  messages
});

// Register all icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);

app.mount('#app');