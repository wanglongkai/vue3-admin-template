/**
 * 并发请求
 */

export function concurRequest(urls, maxNum){
  return new Promise(resolve => {
    let index = 0; // 下一次发送请求的下表
    let count = 0; // 完成的请求数量
    const result = []; // 最终的结果
    async function request(){
      const i = index;
      const url = urls[i];
      index++;
      try {
        const resp = await fetch(url);
        result[i] = resp;
      } catch (error) {
        result[i] = error;
      }finally{
        count++;
        if(count === urls.length){
          resolve(result);
        }
        if(index < urls.length){
          request();
        }
      }
    }

    for(let i = 0; i <Math.min(maxNum, urls.length); i++){
      request();
    }
  })
}