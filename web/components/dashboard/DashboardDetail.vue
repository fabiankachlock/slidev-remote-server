<template>
  <h1>Detail</h1>
  <p>{{ id }}</p>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { querySlide } from '../../serverApi/slides';

const route = useRoute();
const router = useRouter();

const title = ref('loading...');
const id = ref('-');
const date = ref('-');

onMounted(async () => {
  const data = await querySlide(<string>route.params['id']);
  console.log(data);
  if (!data) router.go(-1);
  title.value = data.title;
  id.value = data.id;
  date.value = new Date(data.uploadDate).toDateString();
});
</script>
