import type {App} from 'vue';
declare module 'vue'{
  interface ComponentCustomProperties {
    msg: string;
  }
}

const globalData = {
  msg: 'wanglongkai'
}

export default {
  install(app:App){
    Object.entries(globalData).forEach(([key, value]) => {
      app.config.globalProperties[key] = value
    })
  }
}