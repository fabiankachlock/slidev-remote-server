<template>
  <div class="relativ flex flex-col md:flex-row w-full justify-center md:content-start">
    <div class="w-full flex-1 m-3 max-w-3xl">
      <slot name="content"></slot>
    </div>
    <div class="w-max m-3">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
