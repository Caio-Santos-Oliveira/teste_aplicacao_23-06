<script setup lang="ts">
import { TorqHeader, useTorqDarkMode } from '@torq/ds';
import AppShellLayout from '../components/app/AppShellLayout.vue';
import ProductTypeTabs from '../components/studio/ProductTypeTabs.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const {toggle, isDark} = useTorqDarkMode()

const route = useRoute()

const router = useRouter()

const tipoProduto = computed(() => 
    normalizeTipoProdutoId(String(route.params.tipoProduto ?? 'carro'))
)
function handleLogoClick() {
    void router.push(`/studio/${tipoProduto.value}`)
}

</script>

<template>
    <AppShellLayout>
        <template #header>
            <TorqHeader 
            app-name="Layout Configurador"
            app-subtitle="Studio - Constructor Pages"
            variant="product"
            :show-search="false"
            :show-theme-toggle="true"
            :is-dark="isDark"
            @logo-click="handleLogoClick"
            @toggle-theme="toggle"
            />
        </template>
        <p class="p-6 text-fg-secundary">studio vazio por enquanto</p>
        <div class="mx-alto w-full space-y-4 px-4 py-6 max-w[90rem]" >
            <ProductTypeTabs mode="studio" />
            <div>
                painel-preview
            </div>
        </div>
    </AppShellLayout>

</template>