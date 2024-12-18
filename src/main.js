import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css' 
import store from './stores';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(element)
app.use(store)

app.mount('#app')
