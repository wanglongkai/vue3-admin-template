<template>
  <div class='app-container'>
    <el-button plain @click="open">Common Tsx</el-button>
  </div>
</template>

<script lang='tsx' setup>
import { ElMessageBox} from 'element-plus'
import { ref } from 'vue';

const num = ref(0);

const open = () => {
  ElMessageBox({
    title: 'Message',
    message:() => <p>我是一段tsx-- <el-button onClick={() => num.value++}>{ num.value }</el-button></p>,
  }).catch(err=> {
    console.log(err, 19)
  })
}
</script>

<style scoped lang='scss'>
</style>