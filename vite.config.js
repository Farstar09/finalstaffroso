import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: ".",          // <— tell Vite EXACTLY where index.html is
  plugins: [react()],
  base: "/",
});
