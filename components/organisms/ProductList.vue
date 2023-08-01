<template>
  <div
    class="bg-white flex flex-wrap justify-center lg:justify-start px-2 mx-4"
  >
    <div v-for="product in products" class="">
      <product-item :product="product" :key="product.id" />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";
@Component({
  name: "ProductList",
})
export default class extends Vue {
  products = [];

  async created() {
    try {
      const response = await fetch("/products.json");
      this.products = await response.json();
    } catch (error) {}
  }
}
</script>
