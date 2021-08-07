<template>
  <header class="border-0 border-b-2 border-gray-500">
    <div>
      <!-- Logo -->
      <h1>slidev-remote-server</h1>
    </div>
    <div>
      <!-- Github -->
      <!-- Darkmode -->
      <!-- Menu -->
      <p v-if="isLoggededIn">Test</p>
    </div>
  </header>
</template>

<script lang="ts">
import { computed } from '@vue/runtime-core';
import { UserActionType } from '../store/user/type';
import { useStore } from '../store/useStore';
</script>

<script setup lang="ts">
const store = useStore();
const isLoggededIn = computed(() => store.state.user.loggedIn);
store.dispatch(UserActionType.Login, undefined);
</script>
