export default [
  {
    url: "/mock/api/user/getuserinfo",
    method: "get",
    response: ({query}) => {
      console.log(`output->query`,query);
      return {
        code: 200,
        msg: "success",
        "data|6": ["@integer(0, 1000)"],
        p: query.name
      };
    },
  },
  {
    url: "/api/user/getuserinfo",
    method: "post",
    response: ({body}) => {
      console.log(`output->body`,body);
      return {
        code: 200,
        msg: "success",
        "data|6": ["@integer(0, 1000)"],
        name: body.name
      };
    },
  },
];