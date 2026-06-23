<script setup lang="ts">
import { TorqTabs } from '@torq/ds';

const tabs = [
    {
        id: 'carro',
        label: 'Carro'
    },
    {
        id: 'caminhao',
        label: 'Caminhao'
    }
]

</script>

<template>
    <TorqTabs model-value="carro" :tabs="tabs" :variant="pills" />


</template>