<template>
    <div class="tooltip relative inline-block">
        <slot></slot>
        <span class="tooltip-text cursor-default absolute z-10 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-[10px] text-center">{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    text: string;
}>();

</script>

<style scoped>
.tooltip .tooltip-text {
    visibility: 0;
    min-width: 80px;
    width: auto;
    bottom: 65%;
    left: 50%;
    margin-left: 4px;
    opacity: 0;
    transition: opacity .7s ease-in-out;
}

.tooltip:hover .tooltip-text {
    visibility: 1;
    opacity: 1;
} 

</style>
