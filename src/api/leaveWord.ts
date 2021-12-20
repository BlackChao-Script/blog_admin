import { request } from './request'

//! 获取评论数据
export const getLeaveWordData = () => {
  return request({
    url: 'leaveWord',
  })
}
//! 删除评论
export const deleteLeaveWordData = (id: any) => {
  return request({
    method: 'delete',
    url: `leaveWord/${id}`,
  })
}
