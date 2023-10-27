import { reactive, ref } from 'vue';

export const useTable = () => {
  const tableData = ref<any[]>([]);
  const pagination = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0
  });
  const loading = ref(false);

  const setPagination = (data: typeof pagination) => {
    Object.assign(pagination, data);
  };

  // 处理表格数据
  const handlerTableData = (data: any[]) => {
    return data.map((it: any, idx: number) => {
      return {
        ...it,
        // 序号
        $index: pagination.pageNum === 1 ? idx + 1 : (pagination.pageNum - 1) * pagination.pageSize + idx + 1
      };
    });
  };

  return {
    loading,
    tableData,
    pagination,
    setPagination,
    handlerTableData
  };
};
