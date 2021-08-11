<template>
  <DashboardLayout>
    <template v-slot:content>
      <DashboardContent />
    </template>
    <template v-slot:actions>
      <DashboardActions />
    </template>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from './DashboardLayout.vue';
import DashboardContent from './DashboardContent.vue';
import DashboardActions from './DashboardActions.vue';
import { useStore } from '../../store/useStore';
import { onMounted } from '@vue/runtime-core';
import { DashboardActionType } from '../../store/dashboard/type';

const store = useStore();
onMounted(() => {
  store.dispatch(DashboardActionType.LoadPreviews, undefined);
});
</script>
