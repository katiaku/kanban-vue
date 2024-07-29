// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Nunito: true,
                    download: true,
                    inject: true,
                },
            },
        ],
    ],
    css: ['@mdi/font/css/materialdesignicons.min.css'],
    ssr: false,
    app: {
        head: {
            title: 'KanbanVue Board',
        },
    },
})
