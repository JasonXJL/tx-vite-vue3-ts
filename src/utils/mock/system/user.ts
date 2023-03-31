import { AddUserDto, EditUserDto } from '@/utils/axios/api/system/user'
import { PageDto } from '@/utils/axios/request'
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/system/user/',
    method: 'post',
    response: (dto: AddUserDto) => {
      return {
        'code': 200,
        'message': 'success',
        'data': {
          id: '@integer(1,1000)',
          name: dto.name,
          status: dto.status,
          'createTime': '@date("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@date("yyyy-MM-dd HH:mm:ss")'
        }
      }
    }
  },
  {
    url: RegExp('^/api/system/user/[0-9]+/$'),
    method: 'delete',
    response: () => {
      return {
        'code': 200,
        'message': 'success',
        'data': ''
      }
    }
  },
  {
    url: '/api/system/user/batch/',
    method: 'delete',
    response: (ids: string) => {
      return {
        'code': 200,
        'message': 'success',
        'data': ''
      }
    }
  },
  {
    url: '/api/system/user/',
    method: 'put',
    response: (dto: EditUserDto) => {
      return {
        'code': 200,
        'message': 'success',
        'data': {
          id: dto.id,
          name: dto.name,
          status: dto.status,
          'createTime': '@date("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@date("yyyy-MM-dd HH:mm:ss")'
        }
      }
    }
  },
  {
    url: RegExp('^/api/system/user/[0-9]+/$'),
    method: 'get',
    response: () => {
      return {
        'code': 200,
        'message': 'success',
        'data': {
          'id': '@integer(1,1000)',
          'name': '@cname',
          'status': '@boolean',
          'createTime': '@date("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@date("yyyy-MM-dd HH:mm:ss")'
        }
      }
    }
  },
  {
    url: '/api/system/user/',
    method: 'get',
    response: (dto: PageDto) => {
      return {
        'code': 200,
        'message': 'success',
        'data': {
          'total': '@integer(100,1000)',
          'list|10': [
            {
              'id': '@integer(1,1000)',
              'name': '@cname',
              'status': '@boolean',
              'createTime': '@date("yyyy-MM-dd HH:mm:ss")',
              'updateTime': '@date("yyyy-MM-dd HH:mm:ss")'
            }
          ]
        }
      }
    }
  }
] as MockMethod[]
