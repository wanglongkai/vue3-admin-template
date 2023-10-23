<script lang="ts" setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img src="@/assets/layout/logo.svg" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
       <div class="logo-text">
          <img src="@/assets/layout/logo.svg" class="sidebar-logo-text" />
          <span>狼子</span>
       </div>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    display: none;
  }
  .logo-text{
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sidebar-logo-text {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
}

.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .sidebar-logo-text {
    display: none;
  }
}
</style>
