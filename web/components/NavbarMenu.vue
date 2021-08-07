<template>
  <div class="relative inline-flex align-middle w-full">
    <button type="button" @click="toggleMenu">Menu</button>
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
        top-5
      "
      style="border-width: 0.5px"
    >
      <router-link to="/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"> Link A </router-link>
      <router-link to="/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"> Link B </router-link>
      <router-link to="/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"> Link C </router-link>
      <div v-if="isLoggededIn">
        <div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
        <router-link to="/" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
          Link D
        </router-link>
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
