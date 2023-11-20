<template>
  <div class='app-container'>
    <el-link href="https://juejin.cn/post/7019077784400035847">> 深入浅出之 Grid 网格布局</el-link>
    <div class="gridbox">
      <div></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style scoped lang='scss'>
.gridbox{
  width: 300px;
  height: 300px;
  background-color: aquamarine;
  display: grid;
  place-items: center;
  div{
    width: 50px;
    height: 50px;
    background: #000;
  }
}
</style>