import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { init } from '@neutralinojs/lib'
import { isBrowser } from '@/lib/env'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if (!isBrowser) {
  init()
}
