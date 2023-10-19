# vue3-admin-template

## ssh失效

[https://blog.csdn.net/weixin_40922744/article/details/107576748]()

## element_plus组件按需引入
```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

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
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({})
  ],
```

## mock服务配置
1. 安装依赖`pnpm i vite-plugin-mock@2 mockjs -D`
2. 配置`vite.config.ts`
  ```js
  import { viteMockServe } from "vite-plugin-mock";
  plugins: [
    //...
    viteMockServe({
      mockPath: "./mock",//设置mock文件存储目录
      localEnabled: true,//设置是否启用本地mock文件
      logger: true,//是否在控制台显示请求日志
    }),
  ],
  ```
**使用建议：**网络请求时url前缀用`/mock`来进行区分是否走mock接口，不建议统一启用或禁用mock服务。