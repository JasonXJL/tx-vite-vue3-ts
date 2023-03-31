<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { useDark, useToggle } from '@vueuse/core'
import { toRefs } from 'vue'

const globalStore = useGlobalStore()
const {theme} = toRefs(globalStore)

const isDark = useDark()
const toggle = useToggle(isDark)
</script>

<template>
  <el-tooltip :content="theme ? '关闭暗黑模式' : '打开暗黑模式'">
    <el-switch active-icon="moon" inactive-icon="sunny" inline-prompt v-model="theme" @click="toggle()"
               style="--el-switch-on-color: #7a7c7a; --el-switch-off-color: rgb(0,0,0)"/>
  </el-tooltip>
</template>

<style scoped lang="scss">
.el-switch {
  margin-right: 10px;
}
</style>
