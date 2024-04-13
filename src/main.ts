import { WidgetJsPlugin } from '@widget-js/vue3'
import '@widget-js/vue3/dist/style.css'
import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import 'qweather-icons/font/qweather-icons.css'
import '@icon-park/vue-next/styles/index.css'
import '@/assets/qweather.css'

const app = createApp(App)
app.use(router)
app.use(WidgetJsPlugin)
app.mount('#app')
