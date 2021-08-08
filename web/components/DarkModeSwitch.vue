<template>
  <div aria-label="Toggle Theme" class="nav-btn" @click="toggle">
    <icon-ri-moon-fill v-show="isDark" />
    <icon-ri-sun-fill v-show="!isDark" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDark = ref(false);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDark.value = true;
  document.documentElement.classList.add('dark');
}

const toggle = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
};
</script>
