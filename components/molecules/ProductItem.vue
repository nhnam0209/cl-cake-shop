<template>
  <div class="ml-1">
    <div class="card">
      <img :src="product.image_url" alt="Cake Image" class="py-2" />
      <div class="flex flex-col">
        <h3 class="font-bold">{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>
          Price:
          {{
            product.is_on_discount
              ? product.discounted_price
              : product.original_price
          }}
        </p>
        <p v-if="product.is_on_discount">
          Discounted Price: {{ product.discounted_price }}
        </p>
        <p>Stock Count: {{ product.stock_count }}</p>
      </div>
      <div class="inline-flex justify-between w-full">
        <div>
          <div class="mt-2 flex inline-flex">
            <div class="border w-fit">
              <button
                class="py-1 px-2 border-r"
                @click="changeValue(false, count)"
              >
                -
              </button>
              <span class="">
                {{ count }}
              </span>
              <button
                class="py-1 px-2 border-l"
                @click="changeValue(true, count)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="">
          <button
            class="border py-3 px-4 flex"
            @click="addToCart(product, count)"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component({
  name: "ProductItem",
})
export default class extends Vue {
  count: number = 0;
  finalPrice: number = 0;
  @Prop({ default: {} }) product: any;
  cart = this.$vxm.product.cart;

  changeValue(value: any, count: any) {
    if (value) {
      if (count < this.product.stock_count) {
        return this.count++;
      }
    } else if (count > 0) {
      return this.count--;
    }
  }

  addToCart(product: any, quantity: any) {
    product.is_on_discount
      ? (this.finalPrice = product.discounted_price)
      : (this.finalPrice = product.original_price);
    const item = {
      ...product,
      quantity: quantity,
      final_price: this.finalPrice,
    };
    if (this.cart.length > 0) {
      let index = this.cart.findIndex((object: any) => {
        return object.id === product.id;
      });
      if (product.id == this.cart[index].id) {
        const newValue = quantity + this.cart[index].quantity;
        if (
          newValue < this.cart[index].stock_count ||
          newValue == this.cart[index].stock_count
        ) {
          this.$vxm.product.addToCart(item);
        } else {
          alert(
            "Your quantity overpass with our available: " +
              product.stock_count +
              ". Your cart currently is: " +
              this.cart[index].quantity
          );
        }
      }
    } else {
      this.$vxm.product.addToCart(item);
    }
  }

  get productItem() {
    return this.$vxm.product;
  }
  set productItem(value: any) {
    this.$vxm.product.setProduct(value);
  }
}
</script>

<style>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  max-width: 300px;
  height: 530px;
}
</style>
