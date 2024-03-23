<template>
    <div>
        <div 
            v-for="column in columns"
            ::key="column.id"
        >
            <header>
                {{ column.title }}
            </header>
            <p 
                v-for="task in column.tasks"
                :key="task.id"
            >
                {{ task.title }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { Column } from '../types/index';

const columns = ref<Column[]>([
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
]);

</script>
