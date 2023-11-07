<template>
  <div class='app-container'>
    <el-button plain @click="open">
      <InsertTsx :tsx="text"/>
    </el-button>
  </div>
</template>

<script lang='tsx' setup>
import { ElMessageBox} from 'element-plus'
import { ref } from 'vue';
import InsertTsx from './insertTsx';

const num = ref(0);

const buttonText = '点我';
const text = <span>{buttonText}</span>;

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