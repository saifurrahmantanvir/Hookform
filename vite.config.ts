import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url)) */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src/"),
      "utils": path.resolve(__dirname, "./src/shared/utils/")
      /* "Assets": path.resolve(__dirname, "./src/assets/"),
      "Contexts": path.resolve(__dirname, "./src/contexts/"),
      "Hooks": path.resolve(__dirname, "./src/hooks/"),
      "@icons": path.resolve(__dirname, "./src/icons/"),
      "Sections": path.resolve(__dirname, "./src/sections/"),
      "Pages": path.resolve(__dirname, "./src/pages/"),
      "Components": path.resolve(__dirname, "./src/components/"), */
    }
  }
})
