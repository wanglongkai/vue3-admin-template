<template>
  <div class='app-container'>
    {{ count }} <el-button @click="count++">++</el-button>
    <Child :count="count" />
    <el-button @click="changeRoute">卸载</el-button>
    {{ globalData?.msg }}
  </div>
</template>

<script lang='ts' setup>

import { getUserInfo } from '@/api/user'
import Child from './child.vue'
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import useGlobalData from '@/hooks/useGlobalData'

const router = useRouter()
const globalData = useGlobalData()
const changeRoute = () => {
  router.push('/sss')
}

getUserInfo(1)

const count = ref(0)
console.log('父组件setup')
onBeforeMount(() => {
  console.log('父组件onBeforeMount')
})
onMounted(() => {
  console.log('父组件onMounted')
})
onBeforeUpdate(() => {
  console.log('父组件onBeforeUpdate')
})
onUpdated(() => {
  console.log('父组件onUpdated')
})
onBeforeUnmount(() => {
  console.log('父组件onBeforeUnmount')
})
onUnmounted(() => {
  console.log('父组件onUnmounted')
})


</script>

<style scoped lang='scss'>
.app-container {
  width: 400px;
  height: 400px;
  background-color: pink;
}
</style>