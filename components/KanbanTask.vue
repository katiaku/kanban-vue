<template>
    <div 
        class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex"
        :title="task.createdAt.toLocaleDateString()"
    >
        <DragHandle class="pr-2" />
        <span>
            {{ task.title }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { Task } from '@/types';

defineProps<{
    task: Task;
}>();

</script>