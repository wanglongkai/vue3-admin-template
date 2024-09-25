<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang='ts' setup>
import zhCn from "element-plus/es/locale/lang/zh-cn"
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCn;
</script>

<style scoped lang='scss'></style>