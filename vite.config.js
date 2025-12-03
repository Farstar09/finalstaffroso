import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: With a CNAME (custom domain), base must be "/"
export default defineConfig({
  plugins: [react()],
  base: '/',
});
