import { onMounted, ref } from 'vue'

type TBtnStatus = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'

/**
 * @returns {Object}
 * @property {number} resultText - 实时转写内容.
 * @property {number} btnControl - 按钮文本.
 * @property {() => void} handleRecord - 实时转写开关.
 */
export const useRealTimeASR = () => {
  const recorder = new RecorderManager('http://localhost:52347/')

  const btnStatus = ref<TBtnStatus>('CLOSED')
  const btnControl = ref('开始录音')

  let iatWS // ws实例
  const resultText = ref('')
  const resultTextTemp = ref('')

  function changeBtnStatus(status) {
    btnStatus.value = status
    if (status === 'CONNECTING') {
      btnControl.value = '建立连接中'
      resultText.value = ''
      resultTextTemp.value = ''
    } else if (status === 'OPEN') {
      btnControl.value = '录音中'
    } else if (status === 'CLOSING') {
      btnControl.value = '关闭连接中'
    } else if (status === 'CLOSED') {
      btnControl.value = '开始录音'
    }
  }

  function getWebSocketUrl() {
    const url = 'wss://rtasr.xfyun.cn/v1/ws' // 讯飞实时语音转写接口
    const appId = '1f5dc677'
    const secretKey = '24bf494147f3da3c4fb9f2174e322806'
    const ts = Math.floor(new Date().getTime() / 1000)
    const signa = hex_md5(appId + ts)
    const signatureSha = CryptoJSNew.HmacSHA1(signa, secretKey)
    let signature = CryptoJS.enc.Base64.stringify(signatureSha)
    signature = encodeURIComponent(signature)
    return `${url}?appid=${appId}&ts=${ts}&signa=${signature}`
  }

  function renderResult(resultData) {
    const jsonData = JSON.parse(resultData)
    if (jsonData.action == 'started') {
      // 握手成功
      console.log('握手成功')
    } else if (jsonData.action == 'result') {
      const data = JSON.parse(jsonData.data)
      console.log(data)
      // 转写结果
      let resultTextTemp = ''
      data.cn.st.rt.forEach((j) => {
        j.ws.forEach((k) => {
          k.cw.forEach((l) => {
            resultTextTemp += l.w
          })
        })
      })
      if (data.cn.st.type == 0) {
        // 【最终】识别结果：
        resultText.value += resultTextTemp
        resultTextTemp = ''
      }

      resultText.value = resultText.value + resultTextTemp
    } else if (jsonData.action == 'error') {
      // 连接发生错误
      console.log('出错了:', jsonData)
    }
  }

  function connectWebSocket() {
    const websocketUrl = getWebSocketUrl()
    iatWS = new WebSocket(websocketUrl)
    changeBtnStatus('CONNECTING')
    iatWS.onopen = () => {
      // 开始录音
      recorder.start({
        sampleRate: 16000,
        frameSize: 1280,
      })
    }
    iatWS.onmessage = (e) => {
      renderResult(e.data)
    }
    iatWS.onerror = (e) => {
      console.error(e)
      recorder.stop()
      changeBtnStatus('CLOSED')
    }
    iatWS.onclose = () => {
      recorder.stop()
      changeBtnStatus('CLOSED')
    }
  }

  function handleRecord() {
    if (btnStatus.value === 'CLOSED') {
      connectWebSocket()
    } else if (btnStatus.value === 'CONNECTING' || btnStatus.value === 'OPEN') {
      // 结束录音
      recorder.stop()
    }
  }

  onMounted(() => {
    recorder.onStart = () => {
      changeBtnStatus('OPEN')
    }

    recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
      if (iatWS.readyState === iatWS.OPEN) {
        iatWS.send(new Int8Array(frameBuffer))
        if (isLastFrame) {
          iatWS.send('{"end": true}')
          changeBtnStatus('CLOSING')
        }
      }
    }
    recorder.onStop = () => {
      console.log('recorder stop!')
    }
  })

  return {
    resultText,
    btnControl,
    handleRecord,
  }
}
