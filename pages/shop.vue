<template>
  <Default>
    <template #content>
      <div class="h-full">
        <product-list></product-list>
      </div>
    </template>
  </Default>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "ShopPage",
  head() {
    return {
      title: "Shop",
    };
  },
})
export default class extends Vue {
  carts = this.$vxm.product.cart;

  async mounted() {
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
    }
  }
}
</script>
