import { request } from '@/http/request'

// 用户登录接口
export async function userLogin(data){
  const response = await request.post('/mock/user/login', data);
  return response.data;
}

// 获取用户信息
export async function getUserInfo(userId){
  const response = await request.get('/mock/user/userinfo', {params: {userId}});
  return response.data;
}

// 获取用户菜单
export async function getMenuPermissions(userId){
  const response = await request.post('/mock/menu/permissions',{userId});
  return response.data;
}