<script setup lang="ts">
import { TorqBtn, TorqHeader, useTorqDarkMode } from '@torq/ds';
import AppShellLayout from '../components/app/AppShellLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import ProductTypeTabs from '../components/studio/ProductTypeTabs.vue';
import ProductByRegions from '../components/page/ProductByRegions.vue';
import {normalizeTipoProdutoId, TIPOS_PRODUTO_LABELS} from '../default/catalog'

const {toggle, isDark} = useTorqDarkMode()

const route = useRoute()

const router = useRouter()

const tipoProduto = computed(() => 
    normalizeTipoProdutoId(String(route.params.tipoProduto ?? 'carro'))
)
function openStudio() {
    void router.push(`/studio/${tipoProduto.value}`)
}

function handleLogoClick() {
    void router.push(`/configurador/${tipoProduto.value}`)
}

</script>

<template>
<AppShellLayout>
    <template #header>
        <TorqHeader 
        app-name="Pagina Afetada"
        app-subtitle="TIPOS_PRODUTO_LABELS[tipoProduto]"
        variant="product"
        :show-search="false"
        :show-theme-toggle="true"
        :is-dark="isDark"
        @logo-click="handleLogoClick"
        @toggle-theme="toggle"
        >
            <template #actions>
                <TorqBtn variant="secondary" size="sm" @click="openStudio" >Editar Layout</TorqBtn>
            </template>
        </TorqHeader>
    </template>
    <p class="p-6 text-fg-secundary">conteudo ira vir em breve</p>
    <div>
        <ProductTypeTabs mode="configurador" />
        <ProductByRegions :tipo-produto="tipoProduto" />
    </div>
</AppShellLayout>

</template>