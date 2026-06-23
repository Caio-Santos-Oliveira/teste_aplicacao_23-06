<script setup lang="ts">
import { TorqCard } from '@torq/ds';
import type {BlocoLayout} from '../../domain/bloco.types';
import { formatValueCamp } from '../../domain/vizualizacaoView';

defineProps<{bloco: BlocoLayout}>()

</script>
<template>
    
    <TorqCard v-if="bloco.vizualizacao === 'card'" padding="md" variant="elevated" >
        <p class="text-xs font-medium uppercase text-fg-secondary" >{{ bloco.titulo }}</p>
        <dl class="mt-3 space-y-2">
            <div v-for="campo in bloco.campos" :key="campo.id" >
                <dt class="text-xs text-fg-secondary">
                    {{ campo.rotulo }}
                </dt>
                <dd class="text-sm font-medium">
                    {{ formatValueCamp(campo) }}
                </dd>
            </div>
        </dl>
    </TorqCard>

</template>