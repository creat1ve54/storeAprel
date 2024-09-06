<template lang="">
  <div class="filter">
    <div class="filter__header">
      <div class="filter__title">Filters</div>
      <svg width="24" height="24">
        <use xlink:href="~/assets/icons/sprite.svg#sort"></use>
      </svg>
    </div>
    <Accordion class="filter__item filter__item--padding">
      <template v-slot:header>
        Price
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__item-container">
          <Slider
            :value="[0, 400]"
            :min="0"
            :max="400"
            @changePrice="changePrice($event, 0, 400)"
          />
        </div>
      </template>
    </Accordion>
    <Accordion class="filter__item">
      <template v-slot:header>
        Colors
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__item-container">
          <div class="filter__item-colors">
            <div v-for="color in colors" class="color">
              <label :style="{ background: color.name }">
                <input
                  type="checkbox"
                  @change="(e) => onChangeColor(color, e)"
                />
              </label>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
    <Accordion class="filter__item">
      <template v-slot:header>
        Size
        <svg width="12" height="7" stroke="#292D32">
          <use xlink:href="~/assets/icons/sprite.svg#arrow-up"></use>
        </svg>
      </template>
      <template v-slot:content>
        <div class="filter__item-container">
          <div class="filter__item-sizes">
            <div v-for="size in sizes" class="size">
              <label>
                <input type="checkbox" @change="(e) => onChangeSize(size, e)" />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </template>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["changeSize", "changeColor", "changePrice"]);

interface IColor {
  id: number;
  name: string;
  code: string;
}

interface ISize {
  id: number;
  name: string;
  code: string;
}

const colors = ref<IColor[]>([
  {
    id: 1,
    name: "#00C12B",
    code: "Green",
  },
  {
    id: 2,
    name: "#F50606",
    code: "Red",
  },
  {
    id: 3,
    name: "#F5DD06",
    code: "Yellow",
  },
  {
    id: 4,
    name: "#F57906",
    code: "Orange",
  },
  {
    id: 5,
    name: "#06CAF5",
    code: "Turquoise",
  },
  {
    id: 6,
    name: "#063AF5",
    code: "Blue",
  },
  {
    id: 7,
    name: "#7D06F5",
    code: "Purple",
  },
  {
    id: 8,
    name: "#F506A4",
    code: "Pink",
  },
  {
    id: 9,
    name: "#000000",
    code: "Black",
  },
]);

const sizes = ref<ISize[]>([
  {
    id: 1,
    name: "X-Small",
    code: "XS",
  },
  {
    id: 2,
    name: "Small",
    code: "S",
  },
  {
    id: 3,
    name: "Medium",
    code: "M",
  },
  {
    id: 4,
    name: "Large",
    code: "L",
  },
  {
    id: 5,
    name: "X-Large",
    code: "XL",
  },
]);

const checkedColors = ref<IColor[]>([]);
const checkedSizes = ref<ISize[]>([]);

const onChangeColor = (color: IColor, e: Event) => {
  let array = checkedColors.value;

  let checked = (e.target as HTMLInputElement).checked;

  if (checked) {
    array.push(color);
  } else {
    array = checkedColors.value.filter((item) => item.id != color.id);
  }
  checkedColors.value = array;
 
  emit("changeColor", checkedColors.value);
};

const onChangeSize = (size: IColor, e: Event) => {
  let array = checkedSizes.value;

  let checked = (e.target as HTMLInputElement).checked;

  if (checked) {
    array.push(size);
  } else {
    array = checkedSizes.value.filter((item) => item.id != size.id);
  }
  checkedSizes.value = array;

  emit("changeSize", checkedSizes.value);
};

const changePrice = (values: any) => {
  emit("changePrice", values);
}
</script>
<style scoped lang="scss">
.filter {
  position: sticky;
  top: 20px;
  padding: 20px 24px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;

  &__title {
    font-size: 20px;
    font-weight: 700;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__item {
    border-top: 1px solid #d9d9d9;
    padding-top: 24px;
    margin-bottom: 24px;

    &-colors {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }

    &-sizes {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    &-container {
      padding: 20px 0px 0px 0px;
    }

    &--padding {
      .filter__item {
        &-container {
          padding: 20px 22px 0px 22px;
        }
      }
    }
  }

  :deep(.accordion__title) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    svg {
      transition: all 0.3s ease-in-out;
    }
  }

  :deep(.accordion--active) {
    .accordion__title {
      svg {
        transform: rotate(180deg);
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
