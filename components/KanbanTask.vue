<template>
    <div 
        class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[350px] flex text-slate-600"
        :title="task.createdAt.toLocaleDateString()"
        tabindex="0"
    >
        <Tooltip text="Move Ticket">
            <DragHandle class="pr-2 hover:text-emerald-600 transition duration-500 hover:ease-in-out" />
        </Tooltip>
        <span class="cursor-default overflow-hidden break-words pr-2">
            {{ task.title }}
        </span>
        <span class="ml-auto pr-2" @click="changePriority">
            <i :class="priorityIcon" class="mdi mdi-star cursor-pointer transition duration-300"></i>
        </span>
        <Tooltip text="Delete Ticket">
            <i
                class="mdi mdi-close cursor-pointer text-slate-600 self-end hover:text-red-600 transition duration-500 hover:ease-in-out"
                @click="deleteTask"
            ></i>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import type { Task, ID } from '@/types';
import { ref, computed } from 'vue';

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    (e: "delete", payload: ID): void;
}>();

const deleteTask = () => {
    emit("delete", props.task.id);
};

const priority = ref(0);

const changePriority = () => {
    priority.value = (priority.value + 1) % 3;
};

const priorityIcon = computed(() => {
    switch (priority.value) {
        case 0:
            return "mdi mdi-circle-medium text-green-500";
        case 1:
            return "mdi mdi-circle-medium text-yellow-500";
        case 2:
            return "mdi mdi-circle-medium text-red-500";
        default:
            return "";
    }
});

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
