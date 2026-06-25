<script setup lang="ts">
import { TorqCard, TorqSection } from '@torq/ds';
import { TIPOS_PRODUTO_LABELS, type TipoProdutoId } from '../../default/catalog';
import BlockPreviewPainel from './BlockPreviewPainel.vue';

defineProps<{tipoProduto: TipoProdutoId}>()


</script>
<template>
    <TorqSection
        :title="`Preview do Bloco - ${TIPOS_PRODUTO_LABELS[tipoProduto]}`"
        description="Somente o bloco selecionado, atualizado conforme você edita campos e apresentação"
        spacing="sm"
    >
        <TorqCard
            padding="md"
            variant="outlined"
        >
            <BlockPreviewPainel :tipo-produto="tipoProduto" />
        </TorqCard>
    </TorqSection>


</template>