import { request } from './request'

//! 获取md文件数据
export const getMdData = () => {
  return request({
    url: 'md',
  })
}
