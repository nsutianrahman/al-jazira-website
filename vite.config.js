import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // (Or whatever plugins you have)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/al-jazira-website/', // <--- ADD THIS LINE
})