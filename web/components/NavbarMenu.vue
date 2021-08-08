<template>
  <div class="relative w-full h-full align-middle">
    <button type="button" @click="toggleMenu" class="block text-2xl align-middle h-full">
      <icon-gg-menu-grid-o v-if="!menuOpen" />
      <icon-gg-close v-if="menuOpen" />
    </button>
    <div
      :class="{ hidden: !menuOpen, block: menuOpen }"
      class="
        bg-light-bg
        dark:bg-dark-bg
        border-dark-bg
        dark:border-light-bg
        absolute
        text-base
        z-10
        py-2
        list-none
        text-left
        rounded
        mt-1
        right-0
        top-7
      "
      style="border-width: 0.5px; min-width: 10rem"
    >
      <NavbarMenuItem display-name="Github" link="https://github.com/fabiankachlock/slidev-remote-server" is-external />
      <NavbarMenuItem display-name="Slidev" link="https://sli.dev" is-external />
      <div class="divider"></div>
      <div v-if="!isLoggededIn">
        <NavbarMenuItem display-name="Login" link="/auth/login/github" />
      </div>
      <div v-if="isLoggededIn">
        <NavbarMenuItem display-name="Dashboard" link="/dashboard" use-router />
        <div class="divider"></div>
        <NavbarMenuItem display-name="Logout" link="/auth/logout" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store/useStore';
import NavbarMenuItem from './NavbarMenuItem.vue';

const store = useStore();
const isLoggededIn = computed(() => store.state.user.loggedIn);
const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = menuOpen.value ? false : true);
</script>

<style scoped>
.divider {
  @apply h-0 my-2 border border-solid border-t-0 border-gray-800 dark:border-gray-100 opacity-50;
}
</style>
