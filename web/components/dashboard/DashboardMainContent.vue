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
</script>
