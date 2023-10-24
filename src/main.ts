import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'

import "@/router/permission"
import "normalize.css"
import './style/index.scss';

import { loadSvg } from "@/icons"

const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)

app.mount('#app')
