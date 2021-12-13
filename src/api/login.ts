import { request } from './request'

//! 登录
export const loginUser = (user_name: string, password: string) => {
  return request({
    method: 'post',
    url: 'user/login',
    data: {
      user_name,
      password,
    },
  })
}
