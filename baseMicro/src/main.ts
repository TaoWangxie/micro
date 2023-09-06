import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from '@/router';
import { registerChildMicro, globalDataListener } from '@/utils/microjs';

//注册子应用
registerChildMicro()
// 创建vue实例
const app = createApp(App)

// 挂载pinia
app.use(store)
app.use(router);

//全局数据监听
globalDataListener()

app.mount('#app')

