import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import '../assets/font/iconfont.css'
import router from './route'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#PTMapp')
