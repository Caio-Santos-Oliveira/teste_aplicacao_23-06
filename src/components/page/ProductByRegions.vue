<script setup lang="ts">
import { TorqDivider, TorqSection } from '@torq/ds';
import BlockRender from '../blocks/BlockRender.vue';
import { computed } from 'vue';
import { REGIAO_LABELS, REGIAO_ORDEM } from '../../domain/bloco.types';
import { BLOCOS_SEED } from '../../default/blocos.seed.ts';
import { agruparBlocosPorRegiao } from '../../domain/agrupadorPorRegiao.ts';
import type { TipoProdutoId } from '../../default/catalog.ts';


const props = withDefaults(
    defineProps<{
        TipoProduto: TipoProdutoId,
        variant?: 'full' | 'preview'
    }>(),
    {
        variant: 'full'
    }
)

const blocosPorRegiao = computed(() => agruparBlocosPorRegiao(BLOCOS_SEED.carro))

const regioesComBlocos = computed(() =>
    REGIAO_ORDEM.filter((r) => blocosPorRegiao.value[r].length > 0)
)

const isPreview = computed(() => props.variant === 'preview')

</script>
<template>
    <div class="space-y-6" :class="{ 'space-y-4': isPreview }">
        <header>
            <p>Tipo Produto</p> . pagina afetada
            <h2>TipoProduto.nome</h2>
            <p>TipoProduto.status</p>
        </header>
        <section v-for="regiao in regioesComBlocos" :key="regiao" class="space-y-3">
            <TorqSection :title="REGIAO_LABELS[regiao]" spacing="sm">
                <div class="space-y-3" :class="{'grid gap-3 sm:grid-cols-2':regiao === 'lateral'}">
                    <BlockRender v-for="bloco in blocosPorRegiao[regiao]" :key="bloco.id" :bloco="bloco" />
                </div>
            </TorqSection>
            <TorqDivider v-if="regiao !== regioesComBlocos[regioesComBlocos.length-1]" />
        </section>
        <p
        v-if="!isPreview"
        class="text-xs text-fg-secondary"

        >Todos os Blocos visiveis agrupados por região</p>
    </div>

</template>