import { request } from './request'

//! 获取md文件数据
export const getMdData = (paegNum: any, pageSize: any) => {
  return request({
    url: 'md',
    params: {
      paegNum,
      pageSize,
    },
  })
}

//! 添加md文件
export const addMd = (
  markdown_name: string,
  article_user: string,
  markdown_title: string,
  markdown_img: string,
  sort_id: number,
  sort_class: string
) => {
  return request({
    method: 'post',
    url: 'md',
    data: {
      markdown_name,
      article_user,
      markdown_title,
      markdown_img,
      sort_id,
      sort_class,
    },
  })
}

//! 删除md文件
export const deleteMdData = (md_id: any) => {
  return request({
    method: 'delete',
    url: `md/${md_id}`,
  })
}

//! 修改md文件
export const modifyMDData = (md_id: any) => {
  return request({
    method: 'put',
    url: `md/${md_id}`,
  })
}
