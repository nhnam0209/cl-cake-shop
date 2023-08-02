<template>
  <div class="w-full h-screen">
    <div
      class="gird grid-cols-1 lg:grid-cols-6 gap-2 grid justify-items-center m-auto top-0 bottom-0 left-0 right-0 p-5"
    >
      <div class="col-span-4 w-full">
        <h1 class="text-4xl lg:text-5xl">Cart</h1>
        <button
          class="inline-flex mb-5 mt-2 w-50 text-white font-bold py-2 px-4 border rounded-lg place-content-center"
          :class="[
            carts.length == 0
              ? 'bg-red-100 cursor-default'
              : 'bg-red-500 hover:bg-red-700 border-red-700 ',
          ]"
        >
          Remove All Cart
        </button>
        <div
          v-if="carts.length == 0"
          class="flex justify-start rounded-lg border-slate-700 w-full md:w-[600px] h-[300px]"
        >
          <div
            class="text-center text-xl md:text-5xl flex justify-center items-center text-slate-400"
          >
            <span class="flex self-center text-[20px] font-bold">
              Start go shop
            </span>
          </div>
        </div>
        <div
          v-else
          class="flex flex-wrap w-full md:w-[600px] border border-solid rounded-lg border-slate-700 p-7"
        >
          <div
            class="p-2 inline-flex"
            v-for="product in carts"
            :key="product.id"
          >
            <Card
              :product="product"
              @increase-value="increaseQuantity(product)"
              @decrease-value="decreaseQuantity(product)"
              @remove-product="removeProduct(product)"
            />
          </div>
        </div>
      </div>
      <div class="w-full col-span-2">
        <h1 class="text-4xl lg:text-5xl">Total</h1>
        <br />
        <form class="bg-blue-200 rounded-lg p-7">
          <div class="grid grid-cols-2">
            <label for="">Sub Total:</label>
            <p class="flex justify-center self-center">{{ subtotal }} $</p>
          </div>
          <div class="grid grid-cols-2">
            <label for="">Shipping:</label>
            <p class="flex justify-center self-center">{{ shipping }} $</p>
          </div>
          <hr />
          <div class="grid grid-cols-2">
            <label for="" class="font-bold">Total:</label>
            <p class="flex justify-center self-center font-bold">
              {{ totalSum }} $
            </p>
          </div>
          <div class="mt-4">
            <button
              type="button"
              class="inline-flex w-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg place-content-center"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "CartSummary",
  computed: {
    subtotal() {
      let subtotal = 0;
      //@ts-ignore
      for (let i of this.carts) {
        const price = i.final_price;
        const quantity = i.quantity;
        let prices = [];
        prices.push(price);
        const subTotalPrice = prices.reduce(function (
          previosValue: any,
          currentValue: any
        ) {
          return previosValue + currentValue;
        });
        subtotal += subTotalPrice * quantity;
      }
      return subtotal.toFixed(2);
    },
    shipping() {
      let shipping = 2.0;
      //@ts-ignore
      if (this.subtotal == 0) {
        return (shipping = 0);
      } else {
        return shipping.toFixed(2);
      }
    },
    totalSum() {
      let totalSum = 0;
      //@ts-ignore
      if (this.subtotal == 0) {
        return totalSum;
      } else {
        //@ts-ignore
        totalSum = Number(this.subtotal) + Number(this.shipping);
        return totalSum;
      }
    },
  },
})
export default class extends Vue {
  carts = this.$vxm.product.cart;

  increaseQuantity(product: any) {
    if (product.quantity < product.stock_count) {
      product.quantity++;
      this.updateCart(product);
    }
  }
  decreaseQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.updateCart(product);
      if (product.quantity === 0) {
        this.removeProduct(product);
      }
    }
  }

  async updateCart(product: any) {
    this.$vxm.product.updateCart(product);
  }

  async removeProduct(product: any) {
    this.$vxm.product.removeProduct(product);
  }

  mounted() {
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
    }
  }
}
</script>
