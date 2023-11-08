import { onUnmounted, ref } from 'vue'

export const useDefer = (max: number, count: number = 1) => {
  const frame = ref(0);
  let fId: number | null = null;
  const updateFrame = () => {
    fId = requestAnimationFrame(() => {
      frame.value = frame.value + count; // 增加帧数，帧数在渲染时用于判断哪些数据可以徐然
      if(frame.value >= max) return;
      updateFrame();
    })
  }
  updateFrame();

  const checkIsRender = (index: number) => {
    // 判断是否可以渲染
    return frame.value >= index;
  }

  // 组件卸载时取消动画帧
  onUnmounted(() => {
    if(fId){
      cancelAnimationFrame(fId)
    }
  })

  return {
    checkIsRender
  }
}