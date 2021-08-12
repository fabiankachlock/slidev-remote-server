<template>
  <h4 class="text-xl primary-text my-2">Actions</h4>
  <div class="relative rounded w-full bg-light-bg-dark dark:bg-dark-bg-dark p-2 flex justify-center">
    <button class="btn">
      <icon-ic-outline-smart-display class="secondary-text icon" />
      <span> Show </span>
    </button>
    <button class="btn">
      <icon-ic-round-present-to-all class="secondary-text icon" />
      <span> Present </span>
    </button>
    <button class="btn">
      <icon-ic-round-edit class="secondary-text icon" />
      <span> Edit </span>
    </button>
    <button class="btn">
      <icon-ic-round-delete-forever class="secondary-text icon" />
      <span> Delete </span>
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.btn {
  @apply mx-2 px-3 py-1 bg-light-bg-light dark:bg-dark-bg-light rounded text-lg transform hover:scale-110 transition-transform duration-100 flex flex-nowrap content-center;
}

.icon {
  @apply mr-2 text-lg block self-center;
}
</style>
