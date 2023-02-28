import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import 'lib-flexible/flexible.js'

import Vant from 'vant';
import 'vant/lib/index.css';

import { createPinia } from 'pinia'

import VueParticles from 'vue-particles'

const app = createApp(App)
const pinia = createPinia()
app
    .use(router)
    .use(Vant)
    .use(pinia)
    .use(VueParticles)
    .mount('#app')