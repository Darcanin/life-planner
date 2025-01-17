import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './', // Добавляем для совместимости с Tauri
	server: {
		proxy: {
			'/api': 'http://localhost:4000',
		},
	},
})
