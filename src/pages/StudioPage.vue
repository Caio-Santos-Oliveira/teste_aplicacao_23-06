<script setup lang="ts">
import { TorqHeader, useTorqDarkMode } from '@torq/ds';
import AppShellLayout from '../components/app/AppShellLayout.vue';
import ProductTypeTabs from '../components/studio/ProductTypeTabs.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { normalizeTipoProdutoId } from '../default/catalog.ts';
import StudioToolBar from '../components/studio/StudioToolBar.vue';
import BlockListPainel from '../components/studio/BlockListPainel.vue';
import PreviewPainel from '../components/studio/PreviewPainel.vue';


const route = useRoute()
const router = useRouter()

const {toggle, isDark} = useTorqDarkMode()

const tipoProduto = computed(() => 
    normalizeTipoProdutoId(String(route.params.tipoProduto ?? 'carro'))
)

function handleLogoClick() {
    void router.push(`/studio/${tipoProduto.value}`)
}

</script>

<template>
    <AppShellLayout>
        <template #header="{shellHeaderPosition, shellContentWidth}">
            <TorqHeader 
                app-name="Layout Configurador"
                app-subtitle="Studio - Constructor Pages"
                variant="product"
                :position="shellHeaderPosition"
                :max-width="shellContentWidth"
                :show-search="false"
                :show-theme-toggle="true"
                :is-dark="isDark"
                @logo-click="handleLogoClick"
                @toggle-theme="toggle"
            >
                <template #actions>
                    <StudioToolBar/>
                </template>
            </TorqHeader>
        </template>
        <div class="mx-alto w-full space-y-4 px-4 py-6 max-w[90rem]" >
            <ProductTypeTabs mode="studio" />
            <div class="studio-split">
                <BlockListPainel :tipo-produto="tipoProduto" />
                <PreviewPainel :tipo-produto="tipoProduto" />
            </div>
        </div>
    </AppShellLayout>

</template>