<template>
  <div class="relative w-full h-full px-8 py-4">
    <div class="flex justify-between items-start mb-4">
      <div class="text-3xl font-semibold">
        <h1>Dashboard</h1>
      </div>
      <div class="text-sm italic">Logged in as {{ email }}.</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { useStore } from '../../store/useStore';

const store = useStore();
const email = computed(() => store.getters.userEmail);
</script>
