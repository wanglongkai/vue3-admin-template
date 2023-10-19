import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

export const useFormData = <T extends Record<any, any>>(data: T, rules: FormRules = {}) => {
  const formDataRef = ref<FormInstance>();
  const formData = reactive<T>(data);
  const formDataRules = reactive<FormRules>(rules);

  //重置
  const reset = (fn = () => {}) => {
    formDataRef.value?.resetFields();
    fn();
  };

  const defaultFormData = data => {
    Object.keys(formData).forEach(key => {
      // @ts-ignore
      formData[key] = data[key];
    });
  };

  return {
    formData,
    formDataRef,
    formDataRules,
    reset,
    defaultFormData
  };
};
