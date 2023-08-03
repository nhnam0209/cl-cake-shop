<template>
  <div class="w-full h-screen">
    <div
      class="grid-cols-1 lg:grid-cols-6 gap-2 grid justify-items-center m-auto top-0 bottom-0 left-0 right-0 p-5"
    >
      <div class="col-span-4 w-full">
        <h1 class="text-4xl lg:text-5xl">Cart</h1>
        <button
          class="inline-flex mb-5 mt-2 w-50 text-white font-bold py-2 px-4 border rounded-lg place-content-center"
          :class="[
            carts.length == 0
              ? 'bg-red-100 cursor-default border-transparent'
              : 'bg-red-500 hover:bg-red-700 border-red-700 ',
          ]"
          @click="removeAllCart"
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
          class="flex flex-wrap w-full lg:w-[600px] border border-solid rounded-lg border-slate-700 p-7"
        >
          <div
            class="p-2 inline-flex"
            v-for="product in carts"
            :key="product.id"
          >
            <Card
              :product="product"
              :is-open="product.is_open_note"
              @increase-value="increaseQuantity(product)"
              @decrease-value="decreaseQuantity(product)"
              @remove-product="removeProduct(product)"
              @open-note="openNote(product)"
            />
            <div
              class="border absolute bg-white mt-4 rounded-md"
              v-if="product.is_open_note"
            >
              <div class="my-2 mx-2 flex flex-col lg:flex-row">
                <label for="" class="mr-5">Optional text on cake:</label>
                <input
                  v-model="inputNote"
                  :placeholder="product.note"
                  class="border border-solid rounded-md w-full"
                  :class="[
                    isExceedingLimit ? 'border-red-500 text-red-500' : '',
                  ]"
                />
              </div>
              <div
                v-if="isExceedingLimit"
                class="w-full flex justify-end text-red-500 mx-auto"
              >
                Maximum 25 characters allowed.
              </div>
              <div class="flex justify-end my-2 mx-2">
                <button
                  class="border py-3 px-4 flex hover:bg-slate-100 rounded-md"
                  @click="addNote(product)"
                  :class="[isExceedingLimit && 'bg-slate-100']"
                  :disabled="isExceedingLimit"
                >
                  Save
                </button>
              </div>
            </div>
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
              :disabled="carts.length == 0"
              :class="[
                carts.length == 0
                  ? 'bg-blue-100  border-transparent '
                  : 'bg-blue-500 hover:bg-blue-700  border-blue-700 ',
              ]"
              class="inline-flex w-50 text-white font-bold border py-2 px-4 rounded-lg place-content-center"
              @click="handleCheckout"
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
})
export default class extends Vue {
  carts = this.$vxm.product.cart;
  inputNote: String = "";
  index: number = 0;
  maxChars: number = 25;

  increaseQuantity(product: any) {
    if (product.quantity < product.stock_count) {
      product.quantity++;
      this.updateQuantity(product);
    }
  }
  decreaseQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
      this.updateQuantity(product);
      if (product.quantity === 0) {
        this.removeProduct(product);
      }
    }
  }

  updateQuantity(product: any) {
    this.$vxm.product.updateQuantity(product);
  }

  removeProduct(product: any) {
    this.$vxm.product.removeProduct(product);
  }
  removeAllCart() {
    this.$vxm.product.removeAllCart();
  }

  openNote(product: any) {
    if (product.is_open_note) {
      product.is_open_note = false;
    } else {
      product.is_open_note = true;
    }
  }

  addNote(product: any) {
    if (this.isExceedingLimit) {
      alert("Maximum text is 25 characters");
    } else {
      let item = { ...product, note: this.inputNote };
      product.is_open_note = false;
      this.$vxm.product.updateNote(item);
    }
  }

  handleCheckout() {
    const newOrder = [this.carts, { total: this.totalSum }];
    this.$vxm.product.handleCheckout(newOrder);
    window.location.href = "/checkout";
  }

  mounted() {
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
    }
  }

  get isExceedingLimit() {
    return this.inputNote.length > this.maxChars;
  }

  get subtotal() {
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
  }

  get shipping() {
    let shipping = 2.0;
    //@ts-ignore
    if (this.subtotal == 0) {
      return (shipping = 0);
    } else {
      return shipping.toFixed(2);
    }
  }

  get totalSum() {
    let totalSum = 0;
    //@ts-ignore
    if (this.subtotal == 0) {
      return totalSum;
    } else {
      //@ts-ignore
      totalSum = Number(this.subtotal) + Number(this.shipping);
      return totalSum;
    }
  }
}
</script>
