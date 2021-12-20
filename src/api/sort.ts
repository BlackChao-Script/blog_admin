import { request } from './request'

//! 获取分类数据
export const getSortData = () => {
  return request({
    url: 'sort',
  })
}
//! 添加分类数据
export const addSort = (id: any, sort_name: string) => {
  return request({
    method: 'post',
    url: 'sort',
    data: {
      id,
      sort_name,
    },
  })
}
//! 修改分类数据
export const modifySortData = (id: any, sort_name: string) => {
  return request({
    method: 'put',
    url: `sort/${id}`,
    data: {
      id,
      sort_name,
    },
  })
}
//! 删除分类数据
export const deleteSortData = (id: any) => {
  return request({
    method: 'delete',
    url: `sort/${id}`,
  })
}
