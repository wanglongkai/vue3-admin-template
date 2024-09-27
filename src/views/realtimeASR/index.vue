<template>
    <div class="app-container">
        <div>浏览器录音听写：<button id="btn_control" @click="handleRecord">{{ btnControl }}</button></div>
        <div id="result">{{ resultText }}</div>
    </div>
</template>
<script lang="ts" setup>
import { useRealTimeASR } from '@/hooks/useRealTimeASR'

const { handleRecord, resultText, btnControl } = useRealTimeASR()
</script>
<style lang="scss" scoped>
.app-container {
    color: black;
}
</style>