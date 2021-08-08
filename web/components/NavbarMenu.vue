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
      <a href="https://github.com/fabiankachlock/slidev-remote-server" target="_blank" class="nav-link secondary-text link-extern">
        Github <icon-bytesize-external class="icon" />
      </a>
      <a href="https://sli.dev" target="_blank" class="nav-link secondary-text link-extern"> Slidev <icon-bytesize-external class="icon" /> </a>
      <div class="divider"></div>
      <div v-if="!isLoggededIn">
        <a href="/auth/login/github" class="nav-link secondary-text"> Login </a>
      </div>
      <div v-if="isLoggededIn">
        <router-link to="/dashboard" class="nav-link secondary-text"> Dashboard </router-link>
        <div class="divider"></div>
        <a href="/auth/logout" class="nav-link secondary-text"> Logout </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store/useStore';

const store = useStore();
const isLoggededIn = computed(() => store.state.user.loggedIn);
const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = menuOpen.value ? false : true);
</script>

<style scoped>
.nav-link {
  @apply text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent transform ease-linear transition-transform hover:translate-x-1;
}

.divider {
  @apply h-0 my-2 border border-solid border-t-0 border-gray-800 dark:border-gray-100 opacity-50;
}

.link-extern {
  @apply flex content-center justify-start items-start;
}
.link-extern .icon {
  @apply ml-2 text-xs;
}
</style>
