export default [
  {
    url: '/mock/menu',
    method: 'post',
    response: ({body, headers}) => {
      if(!headers.authorization){
        return {
          code: 401,
          message: '登录过期，请重新登录'
        }
      }
      if(!body.userId){
        return {
          code: 400,
          message: '错误的请求'
        }
      }
      return  {
        code: 200,
        message: "success",
        data: []
      };
    }
  }
]