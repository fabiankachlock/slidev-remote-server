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
      <p v-if="userData?.loggedIn">Test</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core';
import type { ServerUserInfoResponse } from '../../types/server';
const userData = ref(undefined as ServerUserInfoResponse | undefined);

onMounted(async () => {
  const response: ServerUserInfoResponse = await fetch('/api/user/info').then(res => res.json());
  console.log(response);
  userData.value = {
    loggedIn: response.loggedIn,
    email: response.email
  };
});
</script>
