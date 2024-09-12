<template>
  <div class="modal-detail">
    <button
      class="modal-detail__close"
      @click="$emit('close')"
      aria-label="Закрыть"
    >
      <svg width="40" height="40" fill="#292D32">
        <use xlink:href="~/assets/icons/sprite.svg#close-modal"></use>
      </svg>
    </button>
    <div class="card-detail">
      <div class="card-detail__left">
        <div class="card-detail__img">
          <img :src="film.image" :alt="film.title" />
        </div>
      </div>
      <div class="card-detail__right">
        <div class="card-detail__info">
          <div class="card-detail__title">{{ film.title }}</div>
          <div class="card-detail__descr">{{ film.synopsis }}</div>
          <div class="card-detail__prices">
            <div class="card-detail__new">Rating: {{ film.ranking }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IFilm } from "~/models/models";

const emit = defineEmits(["close"]);

const props = defineProps({
  film: {
    type: Object as PropType<IFilm> | null,
    required: true,
  },
});
</script>
<style scoped lang="scss">
.modal-detail {
  background-color: #fff;
  border-radius: 20px;
  left: 50%;
  max-width: 660px;
  overflow: hidden;
  padding: 50px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  @include mobile {

    padding: 40px 20px;

    overflow: auto;
    max-width: none;
    height: 100%;
    border-radius: 0;

    
  }
}
</style>
