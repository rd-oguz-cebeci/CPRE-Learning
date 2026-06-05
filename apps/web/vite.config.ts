import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/CPRE-Learning/',
    server: {
        port: 5173,
    }
})
