// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  ssr: false,
  app: {
    head: {
      title: "KanbanVue Board",
    }
  }
})
