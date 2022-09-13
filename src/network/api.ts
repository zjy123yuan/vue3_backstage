import { LoginFormInt } from '../type/Login';
import  instance  from '.';
//登录接口
export function login(data:LoginFormInt){
  return instance({
    url:"/login",
    method: 'POST',
    data
  })
}
//商品
export function getGoodsList(){
  return instance({
    url:'/getGoodsList',
    method:"get"
  })
}
//用户
export function getUserList(){
  return instance({
    url:'/getUserList',
    method:"get"
  })
}
//身份
export function getRoleList(){
  return instance({
    url:'/getRoleList',
    method:"get"
  })
}
//权限
export function getAuthorityList(){
  return instance({
    url:'/getAuthorityList',
    method:"get"
  })
}


