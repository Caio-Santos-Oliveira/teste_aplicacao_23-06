<script setup lang="ts">
import { TorqAppShell } from '@torq/ds';



</script>
<template>
    <TorqAppShell 
        header-position="fixed" 
        content-width="full" 
        content-padding="comfortable"
        main-scroll-mode="container"
    >
        <template #header="shellProps">
            <slot name="header" v-bind="shellProps" />
        </template>
        <slot />
    </TorqAppShell>

</template>