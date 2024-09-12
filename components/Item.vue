<template>
  <div class="card">
    <div class="card__img" @click="onOpen">
      <img :src="film.image" :alt="film.title" />
    </div>
    <div class="card__info">
      <div class="card__title" @click="onOpen">{{ film.title }}</div>
      <div class="card__descr">{{ film.synopsis }}</div>
      <div class="card__prices">
        <div class="card__new">Rating: {{ film.ranking }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IFilm } from "~/models/models";
import { usePopup } from "~/сomposable/Popup";
import ModalDetail from "./ModalDetail.vue";
const props = defineProps({
  film: {
    type: Object as PropType<IFilm> | null,
    required: true,
  },
});

function onOpen() {

  let { open, close } = usePopup({
    el: ModalDetail,
    attrs: {
      film: props.film,
      onClose: () => close(),
    },
  });

  open();
}
</script>
<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;

  &__info {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  &__img {
    cursor: pointer;
    border-radius: 20px;
    overflow: hidden;
    max-height: 300px;
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    cursor: pointer;
    margin-top: 16px;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
  }

  &__descr {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
  }

  &__prices {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
  }

  &__new {
    font-weight: 600;
    font-size: 24px;
  }

  &__old {
    font-weight: 600;
    font-size: 24px;
    text-decoration: line-through;
    color: #999999;
  }

  &__sale {
    border-radius: 62px;
    padding: 6px 13px;
    color: #ff3333;
    font-size: 12px;
    font-weight: 500;
    background-color: #ffebeb;
  }
}
</style>
