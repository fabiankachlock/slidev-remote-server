<template>
  <div class="w-full grid grid-cols-1 auto-rows-min justify-center">
    <h1 class="text-center text-6xl italic text-primary m-20 mb-0 mt-60">slidev-remote-server</h1>
    <p class="text-center italic text-2xl my-10 mt-2">Present your slidev slides globally with an ease!</p>
    <div>
      <!-- Logo -->
    </div>
    <div class="flex justify-center mx-auto">
      <div class="action">
        <button type="button" class="btn border border-gray-600 dark:border-gray-400">
          <router-link to="/guide">Get Started</router-link>
        </button>
      </div>
      <div class="action">
        <button type="button" class="btn btn-primary dark-text">
          <router-link to="/login">Login</router-link>
        </button>
      </div>
      <div class="action">
        <button type="button" class="btn btn-primary dark-text">
          <router-link to="/dashboard">Go to Dashboard</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LadingPage'
});
</script>

<style scoped>
.action {
  @apply transition-shadow duration-200;
}

.btn:hover {
  @apply ring-2 ring-gray-400 ring-offset-4 ring-opacity-30 ring-offset-light-bg dark:ring-offset-dark-bg;
}

.btn {
  @apply rounded-lg m-2 px-4 py-2;
}

.btn-primary {
  @apply bg-primary;
}
</style>
