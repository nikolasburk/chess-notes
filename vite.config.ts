import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import process from 'node:process'
import { livestoreDevtoolsPlugin } from '@livestore/devtools-vite'
import react from '@vitejs/plugin-react'

const config = defineConfig({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 60_001,
    fs: { strict: false },
  },
  worker: { format: 'es' },
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    livestoreDevtoolsPlugin({
      schemaPath: ['./src/livestore/schema.ts'],
    }),
  ],
})

export default config
