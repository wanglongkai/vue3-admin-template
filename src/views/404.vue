<template>
  <div class='app-container'>
    404
  </div>
  <img src="sss" alt="" />
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const color = ref('red')
</script>

<style scoped lang="scss">
.app-container {
  color: v-bind(color);
}
</style>