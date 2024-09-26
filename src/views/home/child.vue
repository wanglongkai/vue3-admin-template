<template>
  <div class="app-container">
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

<style scoped lang='scss'>
// 子组件的根元素相当于父元素的子元素，在scoped中也会有样式污染
.app-container {
  align-content: center; // 注意和flex布局中的align-items何align-content区分
}
</style>