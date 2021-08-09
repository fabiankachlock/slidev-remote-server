<template>
  <div
    @click="open"
    class="bg-light-bg-dark dark:bg-dark-bg-dark rounded-lg p-4 my-2 border border-transparent hover:border-primary-light cursor-pointer"
  >
    <h3 class="text-xl text-primary-dark">{{ preview.title }}</h3>
    <div class="relative w-full my-2">
      <img class="block mx-auto rounded" :src="preview.coverUrl" alt="slides cover" />
    </div>
    <div>
      <p class="secondary-text text-sm text-right">Uploaded: {{ uploadedDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import type { UserSlidesPreview } from '../../model/UserSlides';
import { useStore } from '../../store/useStore';

const props = defineProps<{
  preview: UserSlidesPreview;
}>();

const { preview } = toRefs(props);

const store = useStore();
const router = useRouter();
const isEditModeActive = computed(() => store.getters.isDashboardEditMode);

const uploadedDate = computed(() => new Date(preview.value.uploaded).toDateString());
const open = () => router.push('/dashboard/detail/' + preview.value.id);
</script>
