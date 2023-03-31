import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    activePath: '/',
    activePathName: '登录',
    isCollapse: false,
    theme: false
  }),
  actions: {
    changeActivePath(activePath: string) {
      this.activePath = activePath
    },
    changeActivePathName(activePathName: string) {
      this.activePathName = activePathName
    },
    changeMenuStatus() {
      this.isCollapse = !this.isCollapse
    }
  },
  getters: {
    getActivePath: state => state.activePath
  },
  persist: true
})
