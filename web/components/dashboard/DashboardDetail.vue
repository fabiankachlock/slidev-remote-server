<template>
  <div class="relative w-full max-w-3xl mx-auto">
    <h1 class="text-primary-dark text-4xl text-left my-2">{{ slide.title }}</h1>
    <div class="w-full mx-auto my-4">
      <img class="w-full rounded-lg" :src="slide.coverUrl" alt="Cover Image" />
    </div>
    <div class="block w-full my-2">
      <p class="secondary-text text-sm text-right">{{ slide.date }}</p>
    </div>
    <DashboardDetailActions />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { querySlide } from '../../serverApi/slides';
import DashboardDetailActions from './DashboardDetailActions.vue';

const route = useRoute();
const router = useRouter();

const slide = reactive({
  title: 'loading...',
  id: '--',
  date: '--',
  coverUrl: ''
});

onMounted(async () => {
  const data = await querySlide(<string>route.params['id']);
  console.log(data);
  if (!data) router.go(-1);
  slide.title = data.title;
  slide.id = data.id;
  slide.date = new Date(data.uploadDate).toDateString();
  slide.coverUrl = data.coverUrl;
});
</script>
