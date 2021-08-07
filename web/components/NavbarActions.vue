<template>
  <div class="flex h-full justify-center content-center">
    <button class="flex-item primary-text">GH</button>
    <button class="flex-item primary-text">DM</button>
    <button class="flex-item primary-text">
      <NavbarMenu />
    </button>
  </div>
</template>

<script setup lang="ts">
import NavbarMenu from './NavbarMenu.vue';
</script>

<style scoped>
.flex-item {
  display: block;
  @apply mx-1 text-center;
}
</style>
