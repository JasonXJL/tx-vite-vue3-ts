<script setup lang="ts">
import router from '@/router'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

function login() {
  globalStore.changeActivePath('/index')
  globalStore.changeActivePathName('主页')
  router.push('/')
}
</script>

<template>
  <el-container class="login-container">
    <el-card>
      <el-button @click="login">登录</el-button>
    </el-card>
  </el-container>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;

  .el-card {
    width: 30%;
    height: 40%;
    margin-top: 90px;

  }
}
</style>
