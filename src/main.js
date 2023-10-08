import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import router from '../router/index'
import './assets/font/iconfont.css'
import 'ant-design-vue/dist/antd.css';
import getUserAgent from './plugin/getUserAgent'
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(Antd)
app.use(getUserAgent)
app.mount('#app')
