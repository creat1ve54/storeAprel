<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="content">
      <NuxtLayout>
        <NuxtPage />
        <ModalsContainer />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<style scoped lang="scss"></style>
