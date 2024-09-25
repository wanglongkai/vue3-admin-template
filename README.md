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
    // 该配置是为了解决elmessage之类通过 import { ElMessage } from "element-plus" 形式引入会覆盖按需引入，导致样式无效的问题
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
**使用建议：** 网络请求时url前缀用`/mock`来进行区分是否走mock接口，不建议统一启用或禁用mock服务。

## SvgIcon组件
1. 安装依赖`pnpm i vite-plugin-svg-icons`
2. 配置`vite.config.ts`
  ```js
  import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
  plugins: [
    createSvgIconsPlugin({
       iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
       symbolId: "icon-svg-[name]"
     }),
  ]
  ```
3. 封装svg-icon组件
4. 全局注册组件（这一步可选，也可局部手动导入）
  ```js
    import { type App } from "vue"
    import SvgIcon from "@/components/SvgIcon/index.vue"
    import "virtual:svg-icons-register" // 该导入是必须的，如果没有全局注册，需要在main.ts中导入

    export function loadSvg(app: App) {
      app.component("SvgIcon", SvgIcon)
    }
  ```
**补充：**        
将svg文件当做vue组件使用：        
1. 安装依赖``
2. 配置`vite.config.ts`
  ```js
    import svgLoader from "vite-svg-loader"
    plugins: [
      /** 将 SVG 静态图转化为 Vue 组件 */
     svgLoader({ defaultImport: "url" }),
    ]
  ```
3. 引入svg即可使用
```js
import bug from '@/icons/svg/bug.svg?component'
```