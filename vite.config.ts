import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path';
import { viteMockServe } from "vite-plugin-mock";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({
      mockPath: "./mock",//设置mock文件存储目录
      localEnabled: true,//设置是否启用本地mock文件
      logger: true,//是否在控制台显示请求日志
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: false,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: false,
    }),
    ElementPlus({}) // 该配置是为了解决elmessage之类通过 import { ElMessage } from "element-plus" 形式引入会覆盖按需引入，导致样式无效的问题
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
