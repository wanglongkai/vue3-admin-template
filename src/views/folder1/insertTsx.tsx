import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    'tsx': {
      required: true,
      type: Object as any,  // 准确来说类型是jsx，但是目前没找到怎么写
    }
  },
  setup(props){
    return () => {
      return props.tsx
    }
  }
})