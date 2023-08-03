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
            <div class="border w-fit rounded-md">
              <button
                class="py-1 px-2 border-r hover:bg-slate-100"
                @click="changeValue(false, count)"
              >
                -
              </button>
              <span class="p-2">
                {{ count }}
              </span>
              <button
                class="py-1 px-2 border-l hover:bg-slate-100"
                @click="changeValue(true, count)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="">
          <button
            class="border py-3 px-4 flex hover:bg-slate-100 rounded-md"
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
  carts = this.$vxm.product.cart;
  isOpenNote: Boolean = false;

  @Prop({ default: {} }) product: any;

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
    const item = {
      ...product,
      quantity: quantity,
      final_price: product.is_on_discount
        ? product.discounted_price
        : product.original_price,
      is_open_note: false,
    };
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
    }

    if (this.carts.length > 0) {
      let index = this.carts.findIndex((object: any) => {
        return object.id === item.id;
      });

      if (index == -1) {
        this.$vxm.product.addToCart(item);
      } else {
        const newValue = quantity + this.carts[index].quantity;
        if (newValue <= this.carts[index].stock_count) {
          this.$vxm.product.addToCart(item);
        } else {
          alert(
            "Your quantity overpass with our available: " +
              product.stock_count +
              ". Your cart currently is: " +
              this.carts[index].quantity
          );
        }
      }
    } else {
      this.$vxm.product.addToCart(item);
    }
  }

  mounted() {
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
      let index = this.carts.findIndex((object: any) => {
        return object.id === this.product.id;
      });
      if (index != -1) {
        this.count = this.carts[index].quantity;
      }
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
