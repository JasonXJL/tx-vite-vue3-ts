import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({mode, command}) => {
  const {VITE_USE_MOCK} = loadEnv(mode, process.cwd())
  return {
    plugins: [
      viteMockServe({
        mockPath: '/src/utils/mock',
        localEnabled: VITE_USE_MOCK === 'true'
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver()
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver()
        ]
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
