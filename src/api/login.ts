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
//! 修改密码
export const modifyPasswordData = (passowrd: string) => {
  return request({
    method: 'patch',
    url: 'user/modify',
    data: {
      passowrd,
    },
  })
}
