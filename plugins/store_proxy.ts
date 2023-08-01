import Vue from "vue";
import { createProxy } from "vuex-class-component";
import { ProductStore } from "../store/product";

declare module "vue/types/vue" {
  interface Vue {
    $vxm: any;
  }
}
export let storeProxy: any;
export default function ({ store }: any) {
  storeProxy = {
    product: createProxy(store, ProductStore),
  };
  Vue.prototype.$vxm = storeProxy;
}
