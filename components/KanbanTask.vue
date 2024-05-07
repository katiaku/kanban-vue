<template>
    <div 
        class="task bg-slate-100 p-2 mb-2 rounded shadow-sm max-w-[250px] flex text-slate-600"
        :title="task.createdAt.toLocaleDateString()"
        tabindex="0"
    >
        <Tooltip text="Move Ticket">
            <DragHandle class="pr-2 hover:text-emerald-600 transition duration-500 hover:ease-in-out" />
        </Tooltip>
        <span class="cursor-default">
            {{ task.title }}
        </span>
        <Tooltip text="Delete Ticket" class="ml-auto">
            <i
                class="mdi mdi-close cursor-pointer text-slate-600 self-end hover:text-red-600 transition duration-500 hover:ease-in-out"
                @click="deleteTask"
            ></i>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import type { Task, ID } from '@/types';

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    (e: "delete", payload: ID): void;
}>();

const deleteTask = () => {
    emit("delete", props.task.id);
};

</script>

<style>

.sortable-chosen {}

.sortable-drag .task {
    transform: rotate(5deg);
}

.sortable-ghost .task {
    position: relative;
}

.sortable-ghost .task::after {
    content: "";
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

</style>
