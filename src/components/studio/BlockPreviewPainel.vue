<script setup lang="ts">
import { TorqAlert } from '@torq/ds';
import type { TipoProdutoId } from '../../default/catalog';
import { computed } from 'vue';
import { useRuntimeStore } from '../../stores/runtime.store';
import BlocoApresentacaoControles from '../blocks/BlocoApresentacaoControles.vue';


const props = defineProps<{tipoProduto: TipoProdutoId}>()

const runtime = useRuntimeStore()

const activeBlocoId = computed(()=>runtime.getActiveBlocoId(props.tipoProduto))

const blocoAtivo = computed(()=>{
    if(!activeBlocoId.value){
        undefined
    }
    return runtime.getBloco(props.tipoProduto, activeBlocoId.value)
})

</script>
<template>
    <div class="min-h-[200px]">
        <TorqAlert
            v-if="!activeBlocoId"
            variant="info"
        >
            <p class="font-medium text-fg">Nenhum bloco selecionado</p>
            <p class="mt-1 text-sm">Crie/selecione um bloco para editar o conteudo</p>
        </TorqAlert>
        <div
            v-else-if="blocoAtivo"
            class="space-y-4"
        >
            <BlocoApresentacaoControles
                :tipo-produto="tipoProduto"
                :bloco-id="activeBlocoId"
            />
            controles
            <div>
                <p class="mb-2 text-xs font-medium uppercase tracking-wide text-fg-secondary">
                    Preview do Bloco
                </p>
                render
            </div>
        </div>
    </div>


</template>