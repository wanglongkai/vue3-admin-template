import {getCurrentInstance } from 'vue';

export default function useGlobalData(){
  const instance = getCurrentInstance();
  const globalProperties = instance?.appContext.config.globalProperties;
  return globalProperties;
}