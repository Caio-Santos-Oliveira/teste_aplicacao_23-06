import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import { DEFAULT_TIPO_PRODUTO,isTipoProdutoId } from '../default/catalog.ts'

function redirectInvalidTipoProduto(to: RouteLocationNormalized, basePath: 'studio' | 'configurador'){
    const raw = to.params.tipoProduto 
    const value = typeof raw === 'string' ? raw : ''
    if(!isTipoProdutoId(value)){
        return {path: `/${basePath}/${DEFAULT_TIPO_PRODUTO}`, replace: true}
    }
    return true
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            redirect: `/studio/${DEFAULT_TIPO_PRODUTO}`
        },
        {
            path: '/studio/:tipoProduto',
            name: 'studio',
            component: () => import('../pages/StudioPage.vue'), 
            beforeEnter: (to) => redirectInvalidTipoProduto(to, 'studio' )
        },
        {
            path: '/configurador/:tipoProduto',
            name: 'configurador',
            component: () => import('../pages/ConfiguradorPage.vue'), 
            beforeEnter: (to) => redirectInvalidTipoProduto(to, 'configurador' )
        }
    ]
})

export default router
