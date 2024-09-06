<template>
  <div class="slider">
    <div ref="slider"></div>
  </div>
</template>
<script setup lang="ts">
import noUiSlider from "nouislider";
import wNumb from "wNumb";

const slider = ref(null as unknown as HTMLElement as any);

const props = defineProps({
  value: {
    type: Array<Number>,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["changePrice"]);

onMounted(() => {
  if (slider.value) {
    noUiSlider.create(slider.value, {
      start: [0, 400],
      connect: true,
      range: {
        min: props.min,
        max: props.max,
      },
      tooltips: [true, wNumb({ prefix: "$", decimals: 0 })],
      format: wNumb({
        prefix: "$",
        decimals: 0,
      }),
    });

    slider.value.noUiSlider.on(
      "update",
      function (values: Array<string>, handle: number) {
        const res = values.map(x => x.slice(1));
        emit("changePrice", res);
      }
    );
  }
});
</script>
<style lang="scss">
.slider {
  margin-bottom: 32px;

  .noUi-target {
    background: #e9edf5;
    border-radius: 3px;
    border: none;
    box-shadow: none;
    height: 4px;
  }

  .noUi-connect {
    background-color: #000000;
  }

  .noUi-handle {
    width: 16px;
    height: 16px;
    right: -11px;
    top: -7px;
    border-radius: 100%;
    background-color: #000000;
    box-shadow: none;
    border: none;

    &::after {
      display: none;
    }

    &::before {
      display: none;
    }
  }

  .noUi-tooltip {
    border: none;
    background: none;
    padding: 0;
    top: 20px;
    bottom: inherit;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
