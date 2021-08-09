<template>
  <div class="bg-light-bg-light dark:bg-dark-bg-light rounded px-3 py-2">
    <h3 class="text-2xl primary-text text-center md:text-center m-2">Uploaded Slides</h3>
    <div>
      <DashboardSlidesPreview v-for="preview of previews" :preview="preview" :key="preview.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { useStore } from '../../store/useStore';
import DashboardSlidesPreview from './DashboardSlidesPreview.vue';

const store = useStore();
const previews = computed(() => store.getters.dashboardSlidesPreview);
</script>
