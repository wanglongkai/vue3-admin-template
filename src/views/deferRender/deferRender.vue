<template>
  <div class='app-container'>
    <div v-for="(dataItem, index) in dataSource" :key="index">
      <p v-if="checkIsRender(index)">{{ dataItem.title }}------{{ dataItem.desc }}</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { shallowRef, onMounted } from 'vue';
import { useDefer } from './useDefer';

// const { checkIsRender } = useDefer(200, 10); // 总共200条，每帧渲染10条
const { checkIsRender } = useDefer(200, 1); // 总共200条，每帧渲染1条， 测试时更换观察效果， 滚动条高度变化

const dataSource = shallowRef<any[]>([]);
const fetchData = () => {
  dataSource.value = new Array(200).fill({
    title: '这是标题',
    desc: '这是一些乱七八糟的描述'
  })
}

onMounted(() => {
  fetchData();
})
</script>

<style scoped lang='scss'>
</style>