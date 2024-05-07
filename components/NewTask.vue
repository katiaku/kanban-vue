<template>
    <div>
        <textarea
            v-model="title"
            @keydown.tab="createTask"
            @keyup.enter="createTask"
            class="bg-slate-100 focus:bg-slate-100 focus:shadow resize-none rounded w-full border-none p-2"
            :class="{
                'h-10': !focused,
                'h-20': focused,
            }"
            style="outline: none !important"
            @focus="focused = true"
            @blur="focused = false"
            :placeholder="!focused ? '+ Add Ticket' : 'Enter ticket title'"
        />
    </div>
</template>

<script setup lang="ts">
import type { Task } from "@/types";
import { nanoid } from "nanoid";

const emit = defineEmits<{
    (e: "add, payload: Task"): void;
}>();

const focused = ref(false);
const title = ref("");

function createTask(e: Event) {
    if (title.value.trim()) {
        e.preventDefault();
        emit("add", {
            id: nanoid(),
            title: title.value.trim(),
            createdAt: new Date(),
        } as Task);
    }

    title.value = "";
}

</script>
