<template>
  <div v-if="isOpen" class="popup">
    <div class="popup__container">
      <component :is="element" v-bind="attrs"></component>
    </div>
    <div class="popup__overlay" @click="close"></div>
  </div>
</template>
<script setup lang="ts">
import { usePopup } from "~/сomposable/Popup";

const { isOpen, element, close, attrs } = usePopup();
</script>
<style scoped lang="scss">
body {
  overflow: hidden;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 1000;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.4;
    z-index: -1;
  }

  &__container {
    // position: absolute;
    // z-index: 10;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
  }
}
</style>
