<template>
  <div class="bg-light-bg-light dark:bg-dark-bg-light rounded px-3 py-2" style="min-width: 12rem">
    <h3 class="text-2xl primary-text text-left md:text-center m-2">Actions</h3>
    <div class="relative flex flex-row md:flex-col">
      <router-link
        to="/dashboard/upload"
        class="bg-light-bg-dark dark:bg-dark-bg-dark text-base text-center primary-text rounded-md px-5 py-2 m-2 hover:text-primary"
        >Upload New</router-link
      >
      <button
        @click="manageSlides"
        :class="{
          'bg-light-bg-dark dark:bg-dark-bg-dark text-base text-center rounded-md px-5 py-2 m-2 hover:text-primary': true,
          'text-primary': isEditModeActive,
          'primary-text': !isEditModeActive
        }"
      >
        {{ isEditModeActive ? 'Done' : 'Manage Slides' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DashboardMutationType } from '../../store/dashboard/type';
import { useStore } from '../../store/useStore';

const store = useStore();
const isEditModeActive = computed(() => store.getters.isDashboardEditMode);
const manageSlides = () => store.commit(DashboardMutationType.ChangeEditMode, !isEditModeActive.value);
</script>
