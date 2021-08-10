<template>
  <div
    @click="open"
    class="relative bg-light-bg-dark dark:bg-dark-bg-dark rounded-lg p-4 my-2 border border-transparent hover:border-primary-light cursor-pointer"
  >
    <h3 class="text-xl text-primary">{{ preview.title }}</h3>
    <div v-show="isEditModeActive" class="absolute top-2 right-2 rounded bg-light-bg dark:bg-dark-bg p-1">
      <div @click.stop="deleteSlide" class="transform hover:scale-110 transition-transform duration-200">
        <icon-ic-round-delete-forever class="text-xl text-red-600" />
      </div>
    </div>
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
import { DashboardMutationType } from '../../store/dashboard/type';
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
const deleteSlide = () => store.commit(DashboardMutationType.DeleteSlidePreview, preview.value);
</script>
