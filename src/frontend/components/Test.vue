<template>
  <h1>Hello World</h1>
  <div>
    <button @click="counter++">++</button>
    <span>
      {{ counter }}
    </span>
    <button @click="counter--">--</button>
  </div>
  <p>Test + {{ counter }} {{ abc() }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

function abc() {
  return 'test';
}

export default defineComponent({
  name: 'Test',
  methods: {
    abc
  },
  setup() {
    const counter = ref(0);
    return { counter };
  }
});
</script>
