<script setup lang="ts">
import { computed } from 'vue';
import { TorqDivider, TorqSection } from '@torq/ds';
import { PRODUTO_MOCK_INFO, TIPOS_PRODUTO_LABELS, type TipoProdutoId } from '../../default/catalog.ts';
import { agruparBlocosPorRegiao } from '../../domain/agrupadorPorRegiao.ts';
import { REGIAO_LABELS, REGIAO_ORDEM } from '../../domain/bloco.types';
import BlockRender from '../blocks/BlockRender.vue';
import { useRuntimeStore } from '../../stores/runtime.store.ts';


const props = withDefaults(
    defineProps<{
        tipoProduto: TipoProdutoId,
        variant?: 'full' | 'preview'
    }>(),
    {
        variant: 'full'
    }
)

const runtime = useRuntimeStore()

const blocosPorRegiao = computed(() => agruparBlocosPorRegiao(runtime.getBlocos(props.tipoProduto)))

const regioesComBlocos = computed(() =>
    REGIAO_ORDEM.filter((r) => blocosPorRegiao.value[r].length > 0)
)

const isPreview = computed(() => props.variant === 'preview')

</script>
<template>
    <div class="space-y-6" :class="{ 'space-y-4': isPreview }">
        <header>
            <p
                class="text-xs font-medium uppercase tracker-wide text-fg-secondary"
            >{{ TIPOS_PRODUTO_LABELS[tipoProduto] }} . Pagina Afetada</p> 
            
            <h2 class="mt-1 text-2xl font-bold text-fg">
                {{PRODUTO_MOCK_INFO[tipoProduto].nome}}</h2>
            
            <p class="mt-1 text-sm text-fg-secondary"
            >{{PRODUTO_MOCK_INFO[tipoProduto].statusLabel}}</p>
        </header>
        <section 
            v-for="regiao in regioesComBlocos" 
            :key="regiao" 
            class="space-y-3"
        >
            <TorqSection :title="REGIAO_LABELS[regiao]" spacing="sm">
                <div 
                    class="space-y-3" 
                    :class="{'grid gap-3 sm:grid-cols-2':regiao === 'lateral'}"
                >
                    <BlockRender 
                        v-for="bloco in blocosPorRegiao[regiao]" 
                        :key="bloco.id" 
                        :bloco="bloco" 
                    />
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