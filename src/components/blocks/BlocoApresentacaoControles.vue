<script setup lang="ts">
import { computed } from 'vue';
import type { TipoProdutoId } from '../../default/catalog';
import { useRuntimeStore } from '../../stores/runtime.store';
import { REGIAO_LABELS, VIZUALIZACAO_LABELS, type Regiao, type Vizualizacao } from '../../domain/bloco.types';



const props = defineProps<{
    tipoProduto: TipoProdutoId,
    blocoId: string
}>()

const runtime = useRuntimeStore()

const bloco = computed(()=>runtime.getBloco(props.tipoProduto, props.blocoId))

const vizualizacoes = Object.entries(VIZUALIZACAO_LABELS) as [Vizualizacao, string][]

const regioes = Object.entries(REGIAO_LABELS) as [Regiao, string][]

function alterarVizualizacao(vizualizacao: Vizualizacao): void {
    runtime.setBlocoVizualizacao(props.tipoProduto, props.blocoId, vizualizacao)
}

function alterarRegiao(regiao: Regiao): void {
    runtime.setBlocoRegiao(props.tipoProduto, props.blocoId, regiao)
}

function alterarOrdem(event: Event): void {
    const alvo = event.target as HTMLInputElement
    runtime.setBlocoOrdem(props.tipoProduto, props.blocoId, Number(alvo.value))
}

function alterarVisivel(event: Event): void {
    const alvo = event.target as HTMLInputElement
    runtime.setBlocoVisivel(props.tipoProduto, props.blocoId, alvo.checked)
}

</script>

<template>
    <div
        v-if="bloco"
        class="space-y-3 rounded-lg border-border bg-bg-secondary p-3"
    >
        <p class="text-xs font-medium uppercase tracking-wide text-fg-secondary">
            Apresentação do Bloco
        </p>
        <p class="text-xs text-fg-secondary">
            Escolha como os campos deste bloco serão exibidos
        </p>
        <div>
            <label class="mb-1 block text-xs text-fg-secondary">
                Visualização
            </label>
            <div class="flex flex-wrap gap-2">
                <button 
                    v-for="[id, label] in vizualizacoes"
                    :key="id"
                    type="button"
                    class="rounded-md border px-2 py-1 text-xs transition-colors"
                    :class="
                        bloco.vizualizacao===id
                        ? 'border-primary-500 bg-primary-50 font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                        : 'border-border bg-bg text-fg-secondary hover:bg-bg-secondary'    
                    "
                    @click="alterarVizualizacao(id)"
                >
                    {{label}}
                </button>
            </div>
        </div>
        <div>
            <label class="mb-1 block text-xs text-fg-secondary">
                Região
            </label>
            <div class="flex flex-wrap gap-2">
                <button 
                    v-for="[id, label] in regioes"
                    :key="id"
                    type="button"
                    class="rounded-md border px-2 py-1 text-xs transition-colors"
                    :class="
                        bloco.regiao===id
                        ? 'border-primary-500 bg-primary-50 font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                        : 'border-border bg-bg text-fg-secondary hover:bg-bg-secondary'    
                    "
                    @click="alterarRegiao(id)"
                >
                    {{label}}
                </button>
            </div>
        </div>
        <div class="flex flex-wrap gap-4">
            <div>
                <label 
                    class="md-1 block text-xs text-fg-secondary"
                    :for="`Ordem - ${blocoId}`"
                >Ordem</label>
                <input  
                    :id="`Ordem - ${blocoId}`"
                    type="number"
                    min="1"
                    :value="bloco.ordem"
                    class="w-20 ronded-md border border-border bg-bg px-2 py-1 text-sm"
                    @click="alterarOrdem"
                />
            </div>
            <label
                class="flex item-center gap-2 text-fg"
            >
            <input 
                type="checkbox" 
                class="accet-primary-600" 
                :checked="bloco.visivel"
                @change="alterarVisivel"
            >
            Visivel na página
            </label>
        </div>
    </div>


</template>