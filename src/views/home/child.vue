<template>
  <div class='app-container'>
    子组件{{ count }}
  </div>
</template>

<script lang='ts' setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated } from 'vue'
defineProps(['count'])

console.log('子组件setup')
onBeforeMount(() => {
  console.log('子组件onBeforeMount')
})
onMounted(() => {
  console.log('子组件onMounted')
})
onBeforeUpdate(() => {
  console.log('子组件onBeforeUpdate')
})
onUpdated(() => {
  console.log('子组件onUpdated')
})
onBeforeUnmount(() => {
  console.log('子组件onBeforeUnmount')
})
onUnmounted(() => {
  console.log('子组件onUnmounted')
})
</script>

<style scoped lang='scss'></style>