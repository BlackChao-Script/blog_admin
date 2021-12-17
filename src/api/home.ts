import { request } from './request'

//! 获取轮播图数据
export const getCarouselData = () => {
  return request({
    url: 'home/carousel',
  })
}
//! 添加轮播图
export const addCarouselData = (
  carousel_name: string,
  carousel_src: string,
  carousel_link: string
) => {
  return request({
    method: 'post',
    url: 'home/carousel',
    data: {
      carousel_name,
      carousel_src,
      carousel_link,
    },
  })
}
//! 删除轮播图
export const deleteCarouselData = (id: string) => {
  return request({
    method: 'delete',
    url: `home/carousel/${id}`,
  })
}
//! 修改轮播图
export const modifyCarouselData = (
  id: string,
  carousel_name: string,
  carousel_src: string,
  carousel_link: string
) => {
  return request({
    method: 'put',
    url: `home/carousel/${id}`,
    data: {
      carousel_name,
      carousel_src,
      carousel_link,
    },
  })
}
