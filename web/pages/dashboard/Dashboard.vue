<template>
  <div class="relative w-full h-full px-8 py-4">
    <div class="flex justify-between items-start mb-4">
      <div class="text-3xl font-semibold">
        <h1>Dashboard</h1>
      </div>
      <div class="text-sm italic">Logged in as {{ email }}.</div>
    </div>
    <DashboardLayout>
      <template v-slot:content>
        <DashboardContent />
      </template>
      <template v-slot:actions>
        <DashboardActions />
      </template>
    </DashboardLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { useStore } from '../../store/useStore';
import DashboardLayout from '../../components/dashboard/DashboardLayout.vue';
import DashboardContent from '../../components/dashboard/DashboardContent.vue';
import DashboardActions from '../../components/dashboard/DashboardActions.vue';

const store = useStore();
const email = computed(() => store.getters.userEmail);
</script>
