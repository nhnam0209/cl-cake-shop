<template>
  <Default>
    <template #content>
      <div class="h-full">
        <checkout-summary :order="order" />
      </div>
    </template>
  </Default>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "CheckoutPage",
  layout: "cake-shop-layout",
  head() {
    return {
      title: "Checkout",
    };
  },
})
export default class extends Vue {
  order = this.$vxm.product.order;

  async created() {
    if (localStorage.getItem("order")) {
      const orderData = JSON.parse(localStorage.order);
      this.$vxm.product.setOrder(orderData);
      this.order = orderData;
      if (this.order.length > 3) {
        alert("Something wrong! Please take order again");
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  }
}
</script>
