// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";
import { defineNuxtConfig } from "nuxt/config";


export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: ''
   },
});
