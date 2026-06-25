<script setup lang="ts">
import { TorqBtn } from '@torq/ds';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { normalizeTipoProdutoId } from '../../default/catalog';

const route = useRoute()
const router = useRouter()

const tipoProduto = computed(()=>
    normalizeTipoProdutoId(String(route.params.tipoProduto ?? 'carro'))
)

function openConfigurador(){
    void router.push(`/configurador/${tipoProduto.value}`)
}


</script>
<template>
    <div class="flex flex-wrap items-center gap-2">
        <TorqBtn 
            variant="primary"
            size="sm"
            disabled
            title="futuro-draft-mais-persistencia"
        >Salvar</TorqBtn>
        <TorqBtn 
            variant="secondary"
            size="sm"
            disabled
            title="futuro-draft-mais-persistencia"
        >Descartar</TorqBtn>
        <TorqBtn 
            variant="ghost"
            size="sm"
            @click="openConfigurador"
        >Abrir Página Afetada</TorqBtn>
    </div>


</template>