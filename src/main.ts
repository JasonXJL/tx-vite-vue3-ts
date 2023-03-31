import App from '@/App.vue'
import router from '@/router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import piniaPlugin from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPlugin)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
