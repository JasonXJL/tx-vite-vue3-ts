import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/system/menu/',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: 1,
            parentId: 0,
            name: '主页',
            path: '/index',
            icon: 'HomeFilled',
            children: []
          },
          {
            id: 2,
            parentId: 0,
            name: '业务管理',
            path: '/service',
            icon: 'Box',
            children: [
              {
                id: 4,
                parentId: 2,
                name: '业务1',
                path: '/service1',
                icon: 'Goods',
                children: []
              },
              {
                id: 5,
                parentId: 2,
                name: '业务2',
                path: '/service2',
                icon: 'Coin',
                children: []
              },
              {
                id: 6,
                parentId: 2,
                name: '业务3',
                path: '/service3',
                icon: 'CollectionTag',
                children: []
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            name: '系统管理',
            path: '/system',
            icon: 'Setting',
            children: [
              {
                id: 7,
                parentId: 3,
                name: '用户管理',
                path: '/user',
                icon: 'User',
                children: []
              },
              {
                id: 8,
                parentId: 3,
                name: '角色管理',
                path: '/role',
                icon: 'Lock',
                children: []
              },
              {
                id: 9,
                parentId: 3,
                name: '菜单管理',
                path: '/menu',
                icon: 'Menu',
                children: []
              }
            ]
          }
        ]
      }
    }
  }
] as MockMethod[]
