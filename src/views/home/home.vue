<template>
  <div class='app-container'>
    home
  </div>
</template>

<script lang='ts' setup>
import { getUserInfo } from '@/api/user'

getUserInfo(1);
</script>

<style scoped lang='scss'>
</style>