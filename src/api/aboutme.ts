import { request } from './request'

//! 获取关于我的数据
export const getAboutMeData = () => {
  return request({
    url: 'aboutMe',
  })
}
//! 修改关于我的数据
export const modifyAboutMeData = (
  id: any,
  me_img: string,
  me_introduce: string
) => {
  return request({
    method: 'put',
    url: `aboutMe/${id}`,
    data: {
      me_img,
      me_introduce,
    },
  })
}
