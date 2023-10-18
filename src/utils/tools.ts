// 将数组结构整理成树结构
export const generateTreefromArray = (list: any[], parentId: string | number = 0) => {
  const result: any[] = [];
  list.forEach(item => {
    if(item.parentId === parentId){
      const children = generateTreefromArray(list, item.id);
      if(children.length){
        item.children = children;
      }
      result.push(item);
    }
  })
  return result;
}

// 将数据树扁平化为数组
export const flattenTreeToArray = (tree: any[], childrenKey = 'children') => {
  const result: any[] = [];
  const traverse = (list: any[]) => {
    list.forEach(item => {
      result.push(item);
      if (item[childrenKey]) {
        traverse(item[childrenKey]);
      }
    });
  };
  traverse(tree);
  return result;
}