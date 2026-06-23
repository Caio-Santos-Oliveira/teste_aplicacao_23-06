import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/studio/carro'},
        {
            path: '/studio/:tipoProduto',
            name: 'studio',
            component: () => import('../pages/StudioPage.vue') 
        },
        {
            path: '/configurador/:tipoProduto',
            name: 'configurador',
            component: () => import('../pages/ConfiguradorPage.vue') 
        }
    ]
})

export default router
