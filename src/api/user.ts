import { request } from '@/http/request'

// 用户登录接口
export async function userLogin(data){
  if(import.meta.env.VITE_APP_BASE_API === '/prod-api'){
    return {
      code: 200,
      message: "success",
      access_token: 'testmockaccesstoken2023',
      userId: 1
    }
  }
  const response = await request.post('/mock/user/login', data);
  return response.data;
}

// 获取用户信息
export async function getUserInfo(userId){
  if(import.meta.env.VITE_APP_BASE_API === '/prod-api'){
    return {
      code: 200,
      message: "success",
      data: {
        id: userId,
        name: 'admin',
        nickname: '狼子',
        phoneNumber: '18223898112'
      },
    }
  }
  const response = await request.get('/mock/user/userinfo', {params: {userId}});
  return response.data;
}

// 获取用户菜单
export async function getMenuPermissions(userId){
  if(import.meta.env.VITE_APP_BASE_API === '/prod-api'){
    return {
      code: 200,
      message: "success",
      data: ['Home','Structure', 'Menu', 'Menu1', 'Menu1-1', 'Menu1-2', 'Menu1-2-1', 'Menu2', 'Menu1-2-2', 'DeferRender', 'Grid']
    }
  }
  const response = await request.post('/mock/menu/permissions',{userId});
  return response.data;
}