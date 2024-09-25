import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const userCounterStore = defineStore('count', () => {
  const number = reactive({
    num: 0,
  })
  function increment() {
    console.log('output->num', number.num)
    number.num++
  }

  return { ...toRefs(number), increment }
})
