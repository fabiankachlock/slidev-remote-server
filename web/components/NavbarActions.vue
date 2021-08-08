<template>
  <div class="flex h-full justify-center content-center">
    <button class="flex-item primary-text text-xl">
      <icon-ri-github-fill />
    </button>
    <button class="flex-item primary-text text-xl">
      <DarkModeSwitch />
    </button>
    <div class="flex-item primary-text">
      <NavbarMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarMenu from './NavbarMenu.vue';
import DarkModeSwitch from './DarkModeSwitch.vue';
</script>

<style scoped>
.flex-item {
  display: block;
  @apply mx-2 text-center;
}
</style>
