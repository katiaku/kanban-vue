<template>
    <div
        class="content flex items-start overflow-x-auto overflow-y-auto gap-4 mb-4"
    >
        <draggable
            v-model="columns"
            group="columns"
            :animation="150"
            handle=".drag-handle"
            item-key="id"
            class="flex items-start gap-4"
        >
            <template #item="{ element: column }: { element: Column }">
                <div
                    class="column bg-slate-200 p-5 pt-3 rounded w-[350px] min-h-[640px] border-t-8 border-emerald-500 mb-4 transition duration-500 ease-in-out"
                    :class="{
                        'border-red-500': column.tasks.length >= ticketLimit,
                    }"
                >
                    <header
                        class="mb-1 text-slate-700 flex justify-between items-center"
                    >
                        <Tooltip
                            text="Move Column"
                            class="font-normal hover:text-emerald-600 transition duration-500 hover:ease-in-out"
                        >
                            <DragHandle />
                        </Tooltip>

                        <input
                            class="uppercase title-input bg-transparent focus:bg-slate-100 rounded p-2 mx-2 w-4/5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            @keyup.enter="
                                ($event.target as HTMLInputElement).blur()
                            "
                            @keydown.backspace="
                                column.title === ''
                                    ? (columns = columns.filter(
                                          (c) => c.id !== column.id
                                      ))
                                    : null
                            "
                            type="text"
                            v-model="column.title"
                        />

                        <Tooltip text="Delete Column" class="">
                            <i
                                class="mdi mdi-delete cursor-pointer text-slate-600 hover:text-red-600 transition duration-500 hover:ease-in-out"
                                @click="deleteColumn(column.id)"
                            ></i>
                        </Tooltip>
                    </header>

                    <div class="text-slate-700 text-sm mb-4 pr-1 text-right">
                        Total Tickets: {{ column.tasks.length }} /
                        {{ ticketLimit }}
                    </div>

                    <draggable
                        v-model="column.tasks"
                        :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
                        handle=".drag-handle"
                        :animation="150"
                        item-key="id"
                    >
                        <template #item="{ element: task }: { element: Task }">
                            <div>
                                <KanbanTask
                                    :task="task"
                                    @delete="
                                        column.tasks = column.tasks.filter(
                                            (t) => t.id !== $event
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </draggable>

                    <footer class="min-h-full flex flex-col justify-between">
                        <NewTask @add="column.tasks.push($event)" />
                    </footer>
                </div>
            </template>
        </draggable>
        <button
            @click="createColumn"
            class="bg-slate-200 hover:bg-emerald-500 text-slate-600 hover:text-white whitespace-nowrap p-2 rounded transition duration-500 hover:ease-in-out"
        >
            + Add Column
        </button>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import type { Column, Task } from '../types/index'
import DragHandle from '../components/DragHandle.vue'
import Tooltip from '../components/Tooltip.vue'

const ticketLimit = 5

const columns = useLocalStorage<Column[]>(
    'kanbanBoard',
    [
        {
            id: nanoid(),
            title: 'Backlog',
            tasks: [],
        },
        {
            id: nanoid(),
            title: 'To Do',
            tasks: [],
        },
        {
            id: nanoid(),
            title: 'In Progress',
            tasks: [],
        },
        {
            id: nanoid(),
            title: 'In Revision',
            tasks: [],
        },
        {
            id: nanoid(),
            title: 'Done',
            tasks: [],
        },
    ],
    {
        serializer: {
            read: (value) => {
                return JSON.parse(value).map((column: Column) => {
                    column.tasks = column.tasks.map((task: Task) => {
                        task.createdAt = new Date(task.createdAt)
                        return task
                    })
                    return column
                })
            },
            write: (value) => JSON.stringify(value),
        },
    }
)

const alt = useKeyModifier('Alt')

function createColumn() {
    const column: Column = {
        id: nanoid(),
        title: '',
        tasks: [],
    }
    columns.value.push(column)
    nextTick(() => {
        ;(
            document.querySelector(
                '.column:last-of-type .title-input'
            ) as HTMLInputElement
        ).focus()
    })
}

function deleteColumn(columnId: string) {
    columns.value = columns.value.filter((c) => c.id !== columnId)
}
</script>

<style>
.sortable-drag .task {
    transform: rotate(5deg);
}

.sortable-ghost .task {
    position: relative;
}

.sortable-ghost .task::after {
    content: '';
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.content::-webkit-scrollbar {
    width: 12px;
}

.content::-webkit-scrollbar-track {
    border-radius: 4px;
    border: 2px solid #e2e8f0;
}

.content::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 4px;
}
</style>
