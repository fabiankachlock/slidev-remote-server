<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    test() {
      this.$router.push('/auth');
    }
  }
});
</script>

<style></style>
