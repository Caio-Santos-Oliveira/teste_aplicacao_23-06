import { createApp } from 'vue'
import { initI18n } from '@torq/ds' 
import './style.css'
import '@torq/ds/style.css'
import App from './App.vue'
import router from './router'

initI18n({locale:'pt-BR'}) 

createApp(App).use(router).mount('#app')
