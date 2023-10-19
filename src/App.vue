<template>
  vue3-admin-template
  <el-button>点击</el-button>
  <el-slider v-model="value2" :step="10" show-stops />
</template>

<script lang='ts' setup>
import { request } from '@/http/request';
import { ref } from 'vue';
request.get('/mock/api/user/getuserinfo?name=wlk').then(res => {
  console.log(`output->res`,res)
})
const value2 = ref(0)
</script>

<style scoped lang='scss'>
</style>