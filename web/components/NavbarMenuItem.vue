<template>
  <a v-if="!useRouter" :href="link" target="_blank" class="nav-link secondary-text link-extern">
    {{ displayName }} <icon-bytesize-external v-if="isExternal" class="icon" />
  </a>
  <router-link v-if="useRouter" :to="link" class="nav-link secondary-text">
    {{ displayName }} <icon-bytesize-external v-if="isExternal" class="icon" />
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps<{
  link: string;
  displayName: string;
  useRouter?: boolean;
  isExternal?: boolean;
}>();

const { link, displayName, isExternal } = toRefs(props);
</script>

<style scoped>
.nav-link {
  @apply text-base py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent transform ease-linear transition-transform hover:translate-x-1;
}

.link-extern {
  @apply flex content-center justify-start items-start;
}
.link-extern .icon {
  @apply ml-2 text-xs;
}
</style>
