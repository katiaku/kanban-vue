<template>
    <div class="flex items-start overflow-x-auto gap-4">
        <draggable 
            v-model="columns"
            group="columns"
            :animation="150"
            handle=".drag-handle"
            item-key="id"
            class="flex items-start gap-4"
        >
            <template #item="{ element: column }: { element: Column }">
                <div class="column bg-slate-200 p-5 rounded min-w-[250px] border-t-4 border-emerald-500">
                    <header class="font-bold mb-4 text-slate-600">
                        <DragHandle />
                        <input
                            class="title-input bg-transparent focus:bg-slate-100 rounded p-2 mx-2 w-4/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            @keyup.enter="($event.target as HTMLInputElement).blur()"
                            @keydown.backspace="column.title === '' ? (columns = columns.filter(c => c.id !== column.id)) : null"
                            type="text"
                            v-model="column.title"
                        />
                    </header>
                    <draggable 
                        v-model="column.tasks"
                        :group="{ name: 'tasks', pull: alt ? 'clone' : true}"
                        handle=".drag-handle"
                        :animation="150"
                        item-key="id"
                    >
                        <template #item="{ element: task}: { element: Task }">
                            <div>
                                <KanbanTask 
                                    :task="task"
                                    @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)"
                                />
                            </div>
                        </template>
                    </draggable>
                    <footer class="flex flex-col gap-3">
                        <NewTask @add="column.tasks.push($event)" />
                        <i class="mdi mdi-delete cursor-pointer text-slate-600 self-end hover:text-red-600 transition duration-500 hover:ease-in-out"></i>
                    </footer>
                </div>
            </template>
        </draggable>
        <button
            @click="createColumn"
            class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
        >
            + Add Another Column
        </button>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import draggable from "vuedraggable";
import type { Column, Task } from '../types/index';
import DragHandle from '../components/DragHandle.vue';

const columns = useLocalStorage<Column[]>("kanbanBoard", [
    {
        id: nanoid(),
        title: "Backlog",
        tasks: [
            {
                id: nanoid(),
                title: "Create Dashboard",
                createdAt: new Date(),
            },
            {
                id: nanoid(),
                title: "Create Landing Page",
                createdAt: new Date(),
            },
            {
                id: nanoid(),
                title: "Revise Storybook",
                createdAt: new Date(),
            },
        ],
    },
    {
        id: nanoid(),
        title: "To Do",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "In Progress",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "In Revision",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "Done",
        tasks: [],
    },
], {
    serializer: {
        read: (value) => {
            return JSON.parse(value).map((column: Column) => {
                column.tasks = column.tasks.map((task: Task) => {
                    task.createdAt = new Date(task.createdAt);
                    return task;
                });
                return column;
            });
        },
        write: (value) => JSON.stringify(value),
    },
});

const alt = useKeyModifier("Alt");

function createColumn() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: [],
    }
    columns.value.push(column);
    nextTick(() => {
        (
            document.querySelector(
                ".column:last-of-type .title-input"
            ) as HTMLInputElement
        ).focus();
    });
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
