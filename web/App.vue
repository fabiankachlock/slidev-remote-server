<template>
  <div class="min-w-full min-h-screen">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/Navbar.vue';
</script>

<style></style>
