import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { initI18n } from '@torq/ds' 
import './style.css'
import '@torq/ds/style.css'
import App from './App.vue'
import router from './router'

initI18n({locale:'pt-BR'}) 

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')

