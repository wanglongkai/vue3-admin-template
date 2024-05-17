<script lang="ts" setup>
import { computed } from "vue"

const props = withDefaults(defineProps<{
  name: string,
  color?: string,
  width?: string,
  height?: string
}>(), {
  color: 'currentColor',
  width: '1em',
  height: '1em'
})

const symbolId = computed(() => `#icon-svg-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :width="props.width" :height="props.height">
    <use :href="symbolId" :fill="props.color"/>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
