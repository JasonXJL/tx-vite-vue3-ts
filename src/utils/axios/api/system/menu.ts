import request, { Result } from '@/utils/axios/request'

export interface Menu {
  id: number,
  parentId: number,
  name: string,
  path: string,
  icon: string,
  children: Menu[]
}

export function queryMenu(): Promise<Result<Menu[]>> {
  return request.get('system/menu/')
}
