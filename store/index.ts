import { Store } from "vuex";
import { ProductStore } from "./product";
import { extractVuexModule } from "vuex-class-component";
// export let vxm:any;
export const strict = false;
export default function () {
  return new Store({
    modules: {
      ...extractVuexModule(ProductStore),
    },
  });
}
