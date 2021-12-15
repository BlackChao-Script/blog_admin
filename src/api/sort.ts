import { request } from './request'

//! 获取分类数据
export const getSortData = () => {
  return request({
    url: 'sort',
  })
}
