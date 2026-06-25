<script setup lang="ts">
import { TorqBtn, TorqCard, TorqChip, TorqSection } from '@torq/ds';
import type { TipoProdutoId } from '../../default/catalog';
import { useRuntimeStore } from '../../stores/runtime.store';
import { computed } from 'vue';
import { ordenarBlocosParaLista } from '../../domain/agrupadorPorRegiao';
import { REGIAO_LABELS, VIZUALIZACAO_LABELS } from '../../domain/bloco.types';
import BlocoEditorForm from './BlocoEditorForm.vue';

const props = defineProps<{
    tipoProduto: TipoProdutoId
}>()

const runtime = useRuntimeStore()

const blocosOrdenados = computed(()=>
    ordenarBlocosParaLista(runtime.getBlocos(props.tipoProduto))
)

const activeBlocoId = computed(() => runtime.getActiveBlocoId(props.tipoProduto))

function selecionarBloco(blocoId: string): void {
    runtime.setActiveBlocoId(props.tipoProduto, blocoId)
} 

function criarBloco(): void {
    runtime.criarBloco(props.tipoProduto)
}

</script>
<template>
    <div class="space-y-4">
        <TorqSection
            title="Bloco de Conteúdo"
            description="Crie blocos, selecione um para editar conteudo e apresentar"
            spacing="sm"
        >
            <TorqCard padding="md">
                <TorqBtn
                    variant="primary"
                    size="sm"
                    class="mb-4"
                    @click="criarBloco"
                >
                    + Criar Bloco
                </TorqBtn>
                <ul class="space-y-3">
                    <li
                        v-for="bloco in blocosOrdenados"
                        :key="bloco.id"
                    >
                        <button
                            type="button"
                            class="layout-bloco-button w-full rounded-lg border p-3 text-left transition-colors"
                            :class="{'layout-bloco-button--focused' : activeBlocoId === bloco.id}"
                            @click="selecionarBloco(bloco.id)"
                        >
                            <div class="mb-2 flex flex-wrap item-center gap-2">
                                <span class="font-semibold text-fg">
                                    {{ bloco.titulo }}
                                </span>
                                <TorqChip 
                                    :label="VIZUALIZACAO_LABELS[bloco.vizualizacao]"
                                    size="sm"
                                    :clickable="false"
                                />
                                <TorqChip 
                                    :label="REGIAO_LABELS[bloco.regiao]"
                                    size="sm"
                                    variant="info"
                                    :clickable="false"
                                />
                                <TorqChip 
                                    v-if="!bloco.visivel"
                                    label="oculto"
                                    size="sm"
                                    variant="warning"
                                    :clickable="false"
                                />
                            </div>
                            <p>
                                ordem {{ bloco.ordem }} - {{ bloco.campos.length }} campo(s)
                            </p>
                        </button>
                    </li>
                </ul>
            </TorqCard>
        </TorqSection>
        <BlocoEditorForm
            v-if="activeBlocoId"
            :tipo-produto="tipoProduto"
            bloco-id="activeBlocoId"
        />
    </div>
</template>