<template>
  <h1>Slidev-Remote-Server</h1>
  <p @click="test">Test</p>
  <a href="http://localhost:5000/auth/login/github">Login</a>
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
