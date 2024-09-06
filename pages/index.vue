<template>
  <section class="catalog">
    <div class="container">
      <div class="flex">
        <div class="flex__left">
          <Filter
            @changeSize="changeSize"
            @changeColor="changeColor"
            @changePrice="changePrice"
          />
        </div>
        <div class="flex__right">
          <div class="sort">
            <div class="sort__title">Casual</div>
            <Search
              @onSearch="onSearch"
              :cardsInit="catalogInstallatios.cards"
            />
            <div class="sort__btns">
              <label class="sort__btn">
                <input @click="changeGrid" type="radio" name="view" checked />
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M22 9.02V4.48C22 3.07 21.36 2.5 19.77 2.5H15.73C14.14 2.5 13.5 3.07 13.5 4.48V9.01C13.5 10.43 14.14 10.99 15.73 10.99H19.77C21.36 11 22 10.43 22 9.02Z"
                  />
                  <path
                    d="M22 20.27V16.23C22 14.64 21.36 14 19.77 14H15.73C14.14 14 13.5 14.64 13.5 16.23V20.27C13.5 21.86 14.14 22.5 15.73 22.5H19.77C21.36 22.5 22 21.86 22 20.27Z"
                  />
                  <path
                    d="M10.5 9.02V4.48C10.5 3.07 9.86 2.5 8.27 2.5H4.23C2.64 2.5 2 3.07 2 4.48V9.01C2 10.43 2.64 10.99 4.23 10.99H8.27C9.86 11 10.5 10.43 10.5 9.02Z"
                  />
                  <path
                    opacity="0.4"
                    d="M10.5 20.27V16.23C10.5 14.64 9.86 14 8.27 14H4.23C2.64 14 2 14.64 2 16.23V20.27C2 21.86 2.64 22.5 4.23 22.5H8.27C9.86 22.5 10.5 21.86 10.5 20.27Z"
                  />
                </svg>
              </label>
              <label class="sort__btn">
                <input @click="changeColumn" type="radio" name="view" />
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M19.9 14H4.1C2.6 14 2 14.64 2 16.23V20.27C2 21.86 2.6 22.5 4.1 22.5H19.9C21.4 22.5 22 21.86 22 20.27V16.23C22 14.64 21.4 14 19.9 14Z"
                  />
                  <path
                    d="M19.9 2.5H4.1C2.6 2.5 2 3.14 2 4.73V8.77C2 10.36 2.6 11 4.1 11H19.9C21.4 11 22 10.36 22 8.77V4.73C22 3.14 21.4 2.5 19.9 2.5Z"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div
            :class="
              long
                ? 'catalog__items catalog__items--list'
                : 'catalog__items catalog__items--card'
            "
          >
            <Item v-for="card in cards" :card="card" />
          </div>
          <Pagination
            :currentPage="currentPage"
            :itemsPerPage="itemsPerPage"
            :itemsLength="cardsInit.length"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { ICard } from "~/models/models";
import { useCatalogStore } from "~/store/catalog";

let long = ref(false as Boolean);

function changeGrid() {
  long.value = false;
}

function changeColumn() {
  long.value = true;
}
const catalogInstallatios = useCatalogStore();
await catalogInstallatios.getCards();

const currentPage = ref(1);
const itemsPerPage = ref(7);

const cardsInit = ref<ICard[]>(catalogInstallatios.cards);

const options = ref({
  search: "",
  price: [0, 400],
  sizes: [],
  colors: [],
});

const cards = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return cardsInit.value.slice(startIndex, endIndex);
});

const changePage = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const onSearch = (text: string) => {
  options.value.search = text;
  onOptions(cardsInit.value);
};

const onOptions = (item: ICard[]) => {
  cardsInit.value = catalogInstallatios.cards.filter((item: ICard) => {
    const matchesColor = options.value.colors.length
      ? options.value.colors.some((color) => color.code === item.options.color)
      : true;

    const matchesSize = options.value.sizes.length
      ? options.value.sizes.some((size) => size.code === item.options.size)
      : true;

    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(options.value.search.toLowerCase());

    const matchesPrice =
      item.price >= options.value.price[0] &&
      item.price <= options.value.price[1];

    return matchesColor && matchesSize && matchesSearchQuery && matchesPrice;
  });
};

const changeSize = (sizes: any) => {
  options.value.sizes = sizes;
  onOptions(cardsInit.value);
};

const changeColor = (colors: any) => {
  options.value.colors = colors;
  onOptions(cardsInit.value);
};

const changePrice = (price: any) => {
  options.value.price = price;
  onOptions(cardsInit.value);
};

watch(currentPage, () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>
<style lang="scss">
.catalog {
  margin-top: 40px;
  &__items {
    margin-bottom: 40px;
    &--card {
      display: grid;
      column-gap: 20px;
      row-gap: 36px;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    }

    &--list {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .card {
        flex-direction: row;
        gap: 20px;

        &__img {
          flex: 0 0 auto;
          height: 200px;
          width: 200px;
        }
      }
    }
  }
}
</style>
