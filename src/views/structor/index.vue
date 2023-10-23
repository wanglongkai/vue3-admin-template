<template>
  <div class='app-container'>
    <h3>响应性解构测试</h3>
    <pre>
      一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。
      这其实就是为什么pina的store解构, props解构后会失去响应性的原因。
      reactive解构失去响应性有两个原因:
      1. 属性是ref时, 和上面的情况一样。
      2. 属性是常规值时, 解构会使解构出来的值与原值断开连接
    </pre>
    {{ count }} <el-button @click="add">++</el-button>

    <hr>
    <pre>
      其实pinia的store 就是一个用 reactive 包装的对象，所以直接解构响应性丢失，需要用storeToRefs包装。
    </pre>
    {{ num }} <el-button @click="increment">++</el-button>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { userCounterStore } from './testStore'

const obj = reactive({
  count: ref(0)
})
let { count } = obj; //一个 ref 会在作为响应式对象的属性被访问或修改时自动解包
const add = () => {
  console.log(`output->count`,count); // count是原始值
  count++;
}

const store = userCounterStore();
let { num, increment } = store; //一个 ref 会在作为响应式对象的属性被访问或修改时自动解包




</script>

<style scoped lang='scss'>
</style>