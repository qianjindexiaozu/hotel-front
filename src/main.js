import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import element from 'element-plus'

const app = createApp(App)

app.use(router)
app.use(axios)
app.use(element)

app.mount('#app')
