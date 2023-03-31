<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { Menu } from '@/utils/axios/api/system/menu'
import { toRefs } from 'vue'

const {changeActivePath, changeActivePathName} = toRefs(useGlobalStore())

interface Props {
  menuList: Menu[]
}

defineProps<Props>()
</script>

<template>
  <template v-for="menu in menuList" :key="menu.id">
    <el-menu-item v-if="menu.children.length===0" :index="menu.path"
                  @click="changeActivePath(menu.path);changeActivePathName(menu.name)">
      <el-icon>
        <component :is="menu.icon"/>
      </el-icon>
      <span>{{ menu.name }}</span>
    </el-menu-item>
    <el-sub-menu v-if="menu.children.length!==0" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.icon"/>
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>
      <tree-menu :menu-list="menu.children"/>
    </el-sub-menu>
  </template>
</template>

<style scoped>

</style>
