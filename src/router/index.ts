import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    redirect: 'Index',
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '主页'
        },
        component: () => import('@/views/Index.vue')
      },
      {
        path: '/service1',
        name: 'Service1',
        meta: {
          title: '业务1'
        },
        component: () => import('@/views/service/Service1.vue')
      },
      {
        path: '/service2',
        name: 'Service2',
        meta: {
          title: '业务2'
        },
        component: () => import('@/views/service/Service2.vue')
      },
      {
        path: '/service3',
        name: 'Service3',
        meta: {
          title: '业务3'
        },
        component: () => import('@/views/service/Service3.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/system/User.vue')
      },
      {
        path: '/role',
        name: 'Role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/system/Role.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/views/system/Menu.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
