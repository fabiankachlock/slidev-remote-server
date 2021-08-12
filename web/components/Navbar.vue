<template>
  <header class="fixed border-0 border-b-2 border-gray-500 top-0 left-0 right-0 z-20 bg-light-bg dark:bg-dark-bg">
    <div class="w-full my-2 flex justify-between align-middle">
      <div class="mx-2">
        <NavbarLogo />
      </div>
      <div class="mx-2">
        <NavbarActions />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { UserActionType } from '../store/user/type';
import { useStore } from '../store/useStore';
import NavbarLogo from './NavbarLogo.vue';
import NavbarActions from './NavbarActions.vue';

const store = useStore();
onMounted(() => {
  store.dispatch(UserActionType.Login, undefined);
});
</script>
