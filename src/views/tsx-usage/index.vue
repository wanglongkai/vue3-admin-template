<template>
  <div class="box">
    <el-button @click="count--">-</el-button>
    {{ count }}
    <el-button @click="count++">+</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
    <component :is="render" />
    <render />
  </div>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useCssModule } from 'vue'
const count = ref(0)
const styles = useCssModule()

const render = <div class={styles.istyle}>this is tsx content</div>

const openVn = () => {
  ElMessage({
    message: <p class={styles.pstyle}>
      <span>Message can be  </span>
      <i class={styles.istyle}>VNode---{count.value}</i>
    </p>,
  })
}
</script>
<style lang="scss" scoped>
.box {
  color: red;
  padding: 20px;
}
</style>

<style lang="scss" module>
.pstyle {
  line-height: 1;
  font-size: 14px;
}

.istyle {
  color: teal;
}
</style>
