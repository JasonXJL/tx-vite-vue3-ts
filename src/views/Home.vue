<script setup lang="ts">
import DarkSwitch from '@/components/DarkSwitch.vue'
import TreeMenu from '@/components/TreeMenu.vue'
import { useGlobalStore } from '@/stores/global'
import { Menu, queryMenu } from '@/utils/axios/api/system/menu'
import { onMounted, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeView = ref('Index')
const tabs = ref([
  {
    name: 'Index',
    title: '主页',
    path: '/index'
  }
])
const globalStore = useGlobalStore()
const {isCollapse, activePath, activePathName, changeMenuStatus} = toRefs(globalStore)
const menuList = ref<Menu[]>([])

function tabAdd(route: any) {
  if (tabs.value.findIndex(tab => tab.name === route.name) === -1) {
    tabs.value.push({
      name: route.name,
      title: route.meta.title,
      path: route.path
    })
  }
  activeView.value = route.name
  globalStore.changeActivePath(route.path)
  globalStore.changeActivePathName(route.name)
}

function tabRemove(targetTab: string) {
  let activeTab = activeView.value
  if (activeTab === targetTab) {
    tabs.value.forEach((tab, index) => {
      if (tab.name === targetTab) {
        const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
        if (nextTab) {
          activeView.value = nextTab.name
        }
      }
    })
  }
  tabs.value = tabs.value.filter(value => value.name !== targetTab)
}

function tabChange(name: string) {
  router.push({name: name})
}

function doQueryMenu() {
  queryMenu().then(result => {
    menuList.value = result.data
  })
}

doQueryMenu()

function logout() {
  router.push('/login')
}

watch(
  () => route.path,
  () => {
    tabAdd(route)
  },
  {deep: true}
)
onMounted(() => {
  if (activePath.value !== '/index') {
    router.getRoutes().forEach(value => {
      if (activePath.value === value.path) {
        tabAdd(value)
      }
    })
  }
})
</script>

<template>
  <el-container class="home-container">
    <el-aside>
      <el-menu :default-active="activePath" router unique-opened :collapse="isCollapse">
        <tree-menu :menu-list="menuList"/>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-icon class="menu-switch" size="24px">
          <component :is="isCollapse ? 'Expand' : 'Fold'" @click="changeMenuStatus"/>
        </el-icon>
        <el-text>
          {{ activePathName }}
        </el-text>
        <dark-switch/>
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <el-avatar size="large">Jason</el-avatar>
          </template>
          <el-menu style="border-right:0">
            <el-menu-item index="1">个人中心</el-menu-item>
            <el-menu-item index="2" @click="logout">退出登录</el-menu-item>
          </el-menu>
        </el-popover>
      </el-header>
      <el-main>
        <el-tabs v-model="activeView" type="border-card" @tab-remove="tabRemove" @tab-change="tabChange">
          <el-tab-pane v-for="tab in tabs"
                       :key="tab.name"
                       :label="tab.title"
                       :name="tab.name"
                       :closable="tab.name!=='Index'">
            <router-view v-slot="{Component}">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </router-view>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.home-container {
  height: 100%;

  .el-aside {
    width: auto;
  }

  .el-header {
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 16px;

    .menu-switch {
      margin-right: 10px;
    }

    .el-text {
      margin-right: auto;
      font-size: 28px;
      font-weight: bold;
      color: black;
    }

    .el-popover {
    }

  }

  .el-main {

    .el-tabs {
      height: 97%;
    }
  }
}
</style>
