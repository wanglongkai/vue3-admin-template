<template>
  <div class='login-container'>
    <div class="login-card">
      <div class="content">
        <el-form ref="formDataRef" :model="formData" :rules="formDataRules" @keyup.enter="onSubmitLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="formData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="formData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button type="primary" size="large" @click.prevent="onSubmitLogin"> 登 录 </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { User, Lock } from "@element-plus/icons-vue"
import { useLoginFetch } from './useLoginFetch';

const {formData, formDataRef, formDataRules, onSubmitLogin} = useLoginFetch();
</script>


<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .content {
      padding: 50px;
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>