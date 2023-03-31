import request, { Page, PageDto, Result } from '@/utils/axios/request'

export interface User {
  id: number,
  name: string,

  status: boolean,
  createTime: string,
  updateTime: string
}

export interface AddUserDto {
  name: string,

  status: boolean
}

export interface EditUserDto {
  id: number,
  name: string,

  status: boolean
}

export interface PageUserDto extends PageDto {
  status?: boolean
}

export function addUser(dto: AddUserDto): Promise<Result<string>> {
  return request.post('system/user/', dto)
}

export function deleteUser(id: number): Promise<Result<string>> {
  return request.delete(`system/user/${id}/`)
}

export function deleteBatchUser(ids: string): Promise<Result<string>> {
  return request.delete('system/user/batch/', {params: {ids}})
}

export function editUser(dto: EditUserDto): Promise<Result<string>> {
  return request.put('system/user/', dto)
}

export function queryUser(id: number): Promise<Result<User>> {
  return request.get(`system/user/${id}/`)
}

export function queryUserPage(dto: PageUserDto): Promise<Result<Page<User>>> {
  return request.get('system/user/', {params: dto})
}
