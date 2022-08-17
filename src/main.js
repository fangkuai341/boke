import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '../router/index'
import './assets/font/iconfont.css'
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
