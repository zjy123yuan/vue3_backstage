import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Toasts from './components/common/toast'
// 全局导入ElementPlus 
// import 'element-plus/dist/index.css'
// import  ElementPlus  from 'element-plus';
// createApp(App).use(router).use(ElementPlus).mount('#app')

createApp(App).use(router).mount('#app')
