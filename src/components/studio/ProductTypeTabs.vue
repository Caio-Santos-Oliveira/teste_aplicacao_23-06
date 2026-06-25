<script setup lang="ts">
import { TorqTabs } from '@torq/ds';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { normalizeTipoProdutoId, TIPOS_PRODUTO, TIPOS_PRODUTO_LABELS, type TipoProdutoId } from '../../default/catalog';
import type { TabItem } from '@torq/ds';

const props = defineProps<{
    mode: 'studio' | 'configurador'
}>()

const route = useRoute()
const router = useRouter()

const activeTipo = computed(()=>
    normalizeTipoProdutoId(String(route.params.tipoProduto ?? 'carro'))
)

const tabs = computed<TabItem[]>(()=>
    TIPOS_PRODUTO.map((id)=>({
        id,
        label: TIPOS_PRODUTO_LABELS[id],
        disableClose: true,
    })),
)

function onTabChange(value: string | number) {
    const tipo = normalizeTipoProdutoId(String(value)) as TipoProdutoId
    void router.push(`/${props.mode}/${tipo}`)
} 

</script>

<template>
    <TorqTabs 
        :model-value="activeTipo"
        :tabs="tabs" 
        variant="pills"
        :closable="false"
        :show-close-button="false" 
        :addable="false"
        :show-scroll-buttons="false"
        :show-overflow-menu="false"
        @update:model-value="onTabChange"
    />


</template>