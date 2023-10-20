export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response:({body}) => {
      const {username, password} = body;
      if(username === 'admin' && password === '123456'){
        return {
          code: 200,
          message: "success",
          access_token: 'testmockaccesstoken2023'
        };
      }else{
        return {
          code: 403,
          message: "用户名或密码错误"
        }
      }
    }
  },
  {
    url: "/mock/user/userinfo",
    method: "get",
    response: ({query, headers}) => {
      if(!headers.authorization){
        return {
          code: 401,
          message: '登录过期，请重新登录'
        }
      }
      return {
        code: 200,
        message: "success",
        data: {
          id: query.userId,
          name: 'admin',
          nickname: '狼子',
          phoneNumber: '18223898112'
        },
      };
    },
  },
];