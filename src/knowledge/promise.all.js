Promise.myAll = plist => {
  let resolve, reject;
  let p = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  })

  let count = 0;
  let result = [];
  let i = 0;
  let finishedCount = 0;
  for(let pItem of plist){
    const index = i;
    i++;
    count++;
    Promise.resolve(pItem).then(res => {
      finishedCount++;
      result[index] = res;
      if(finishedCount === count){
        resolve(result);
      }
    }, rej => {
      reject(rej);
    })
  }

  if(count === 0){
    resolve(result)
  }

  return p;
}