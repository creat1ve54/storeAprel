const isOpen = ref<Boolean>(false);
const element = shallowRef<Component | null>(null);
const attrs = shallowRef<any>(null);

interface IOptions {
  el?: Component | null;
  attrs?: any;
}

export const usePopup = (options?: IOptions) => {
  const open = () => {
    document.querySelector("body")!.style.overflow = "hidden";

    isOpen.value = true;

    if (options && options.el) {
      element.value = options.el;
    }

    if (options && options.attrs) {
      attrs.value = options.attrs;
    }
  };

  const close = () => {
    isOpen.value = false;
    document.querySelector("body")!.style.overflow = "";
  };

  return {
    open,
    close,
    isOpen,
    element,
    attrs,
  };
};

console.log(isOpen.value);
