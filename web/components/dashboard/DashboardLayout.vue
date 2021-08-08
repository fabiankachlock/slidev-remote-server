<template>
  <div class="relativ flex flex-col md:flex-row w-full justify-center md:justify-between md:content-start">
    <div class="w-full flex-1 m-3">
      <slot name="content"></slot>
    </div>
    <div class="w-max m-3">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
