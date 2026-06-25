<script setup lang="ts">
import { computed } from 'vue';
import { TorqBtn, TorqCard, TorqSection } from '@torq/ds';
import type { TipoProdutoId } from '../../default/catalog';
import { TIPOS_CAMPO, type CampoBloco, type TipoCampo } from '../../domain/bloco.types';
import { useRuntimeStore } from '../../stores/runtime.store';


const props = defineProps<{
    tipoProduto: TipoProdutoId,
    blocoId: string 
}>()

const runtime = useRuntimeStore()

const bloco = computed(()=>runtime.getBloco(props.tipoProduto, props.blocoId))

function atualizarTitulo(event: Event): void {
    const alvo = event.target as HTMLInputElement
    runtime.atualizarBloco(props.tipoProduto, props.blocoId, {titulo: alvo.value})
}

function atualizarDescricao(event: Event): void {
    const alvo = event.target as HTMLInputElement
    runtime.atualizarBloco(props.tipoProduto, props.blocoId, {descricao: alvo.value})
}

function atualizarCampoRotulo(campoId: string, event: Event): void {
    const alvo = event.target as HTMLInputElement
    runtime.atualizarCampo(props.tipoProduto, props.blocoId, campoId, {rotulo: alvo.value})
}

function atualizarCampoTipo(campoId: string, event: Event): void {
    const alvo = event.target as HTMLSelectElement
    const tipo = alvo.value as TipoCampo
    const patch: Partial<CampoBloco> = {tipo}
    
    if(tipo === 'selecao') {
        patch.opcoes = ['Opção A', 'Opção B']
        patch.valorExemplo = 'Opção A'
    }

    runtime.atualizarCampo(props.tipoProduto, props.blocoId, campoId, patch)
}

function atualizarCampoValor(campoId: string, event: Event): void {
    const alvo = event.target as HTMLInputElement
    const campo = bloco.value?.campos.find((item)=>item.id === campoId)
    if(!campo){
        return
    }
    let valor: string | number | boolean = alvo.value
    if(campo.tipo === 'numero') {
        valor = Number(alvo.value)
    }
    if(campo.tipo === 'boleano') {
        valor = alvo.checked
    }
    runtime.atualizarCampo(props.tipoProduto, props.blocoId, campoId, {valorExemplo: valor})
}

function atualizarCampoOpcoes(campoId: string, event: Event): void {
    const alvo = event.target as HTMLInputElement
    const opcoes = alvo.value.split(',').map((item)=> item.trim()).filter(Boolean)
    
    runtime.atualizarCampo(props.tipoProduto, props.blocoId, campoId, {opcoes})
}

function adicionarCampo(): void {
    runtime.adicionarCampo(props.tipoProduto, props.blocoId)
}

function removerCampo(campoId: string): void {
    runtime.removerCampo(props.tipoProduto, props.blocoId, campoId)
}

function removerBloco(): void {
    if(confirm('Remover ESTE Bloco?')) {
        runtime.removerBloco(props.tipoProduto, props.blocoId)
    }
}

</script>
<template>

    <TorqSection
        v-if="bloco"
        title="Editor de Bloco"
        description="Defina título, descrição, campos e conteúdo"
        spacing="sm"
    >
        <TorqCard padding="md" >
            <div class="space-y-3" >
                <div>
                    <label class="mb-1 block text-xs text-fg-secondary">Titulo</label>
                    <input 
                        type="text"
                        class="w-full rounded-md border border-border bg-bg px-2 py-1 text-sm"
                        :value="bloco.titulo"
                        @change="atualizarTitulo"
                    >
                </div>
                <div>
                    <label 
                        class="mb-1 block text-xs text-fg-secondary"
                    >Descrição Opcional</label>
                    <input 
                        type="text"
                        class="w-full rounded-md border border-border bg-bg px-2 py-1 text-sm"
                        :value="bloco.descricao ?? ''"
                        @change="atualizarDescricao"
                    >
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <p class="text-xs font-medium uppercase tracking-wide text-fg-secondary">
                            Campos
                        </p>
                        <TorqBtn
                            variant="ghost"
                            size="sm"
                            @click="adicionarCampo"
                        >
                            + Campo
                        </TorqBtn>
                    </div>
                    <div
                        v-for="campo in bloco.campos"
                        :key="campo.id"
                        class="space-y-2 rounded-lg border border-border p-2"
                    >
                        <div class="grid gap-2 sm:grid-cols-2">
                            <input 
                                type="text"
                                class="rounded-md border border-border bg-bg px-2 py-1 text-sm"
                                placeholder="Rotulo"
                                :value="campo.rotulo"
                                @change="atualizarCampoRotulo(campo.id, $event)"
                            >
                            <select
                                class="rounded-md border border-border bg-bg px-2 py-1 text-sm"
                                :value="campo.tipo"
                                @change="atualizarCampoTipo(campo.id, $event)"
                            >
                                <option 
                                    v-for="tipo in TIPOS_CAMPO"
                                    :key="tipo"
                                    :value="tipo"
                                >{{tipo}}</option>
                            </select>
                        </div>
                        <input
                            v-if="campo.tipo !== 'boleano'"
                            type="text"
                            class="w-full rounded-md border border-border bg-bg px-2 py-1 text-sm"
                            placeholder="Valor Exemplo"
                            :value="String(campo.valorExemplo ?? '')"
                            @change="atualizarCampoValor(campo.id, $event)"
                        >
                        <label
                            v-else
                            class="flex items-center gap-2 text-sm"
                        >
                            <input
                                type="checkbox"
                                class="accent-primary-600"
                                :checked="Boolean(campo.valorExemplo)"
                                @change="atualizarCampoValor(campo.id, $event)"
                            >
                            Valor exemplo (sim/não)
                        </label>
                        <input 
                        
                            v-if="campo.tipo === 'selecao'"
                            type="text"
                            class="w-full rounded-md border border-border bg-bg px-2 py-1 text-sm"
                            placeholder="Opções Speparadas por Virgula"
                            :value="(campo.opcoes ?? [].join(', '))"
                            @change="atualizarCampoOpcoes(campo.id, $event)"                            
                        >
                        <TorqBtn
                            v-if="bloco.campos.length > 1" 
                            variant="ghost"
                            size="sm"
                            @click="removerCampo(campo.id)" 
                        >
                            Remover Campo
                        </TorqBtn>
                    </div>
                </div>
                <TorqBtn
                    variant="secondary"
                    size="sm"
                    @click="removerBloco"
                >
                    Remover Bloco
                </TorqBtn>
            </div>
        </TorqCard>
    </TorqSection>
</template>