import vue from '@vitejs/plugin-vue'
import path from 'path'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
          resolveIcons: true
        })
      ]
    })
  ],
  optimizeDeps: {
    include: ['@ant-design/icons-vue']
  },
  resolve: {
    alias: {
      moment: 'dayjs',
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
})
