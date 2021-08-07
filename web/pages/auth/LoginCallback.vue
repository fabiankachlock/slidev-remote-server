<template></template>

<script setup lang="ts">
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { UserActionType } from '../../store/user/type';
import { useStore } from '../../store/useStore';

const store = useStore();
const router = useRouter();

store.dispatch(UserActionType.Login, undefined);

watch(
  () => store.getters.userLoggedIn,
  loggedIn => {
    if (loggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/error/auth-error');
    }
  }
);
</script>
