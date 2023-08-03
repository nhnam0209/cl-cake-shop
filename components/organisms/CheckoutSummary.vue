<template>
  <div class="mt-5 w-full">
    <div
      class="grid-cols-1 lg:grid-cols-6 gap-2 grid justify-items-center m-auto top-0 bottom-0 left-0 right-0 p-5"
    >
      <div class="w-full col-span-4 lg:mx-4">
        <h1 class="text-2xl lg:text-3xl w-full text-center">Order Details:</h1>
        <div class="text-lg inline-flex my-3">
          <p class="font-bold mr-2">Total:</p>
          {{ order[1].total }} $
        </div>
        <br />
        <div
          class="flex flex-wrap w-full border border-solid rounded-lg border-slate-700 p-7"
        >
          <div
            class="p-2 inline-flex"
            v-for="product in order[0]"
            :key="product.id"
          >
            <Card :product="product" :is-view-only="true" />
          </div>
        </div>
      </div>
      <div class="w-full col-span-2">
        <h1 class="text-2xl lg:text-3xl">Customer Infomation</h1>
        <br />
        <form class="bg-blue-200 rounded-lg p-7">
          <div class="grid grid-cols-2">
            <label for="">Name:</label>
            <input
              type="text"
              class="border rounded-md"
              required
              v-model="userInfo.fname"
            />
          </div>
          <div class="grid grid-cols-2 my-3">
            <label for="">Phone:</label>
            <input
              type="text"
              class="border rounded-md"
              required
              v-model="userInfo.phone_number"
            />
          </div>
          <div class="grid grid-cols-2 my-3">
            <label for="">Email:</label>
            <input
              type="email"
              class="border rounded-md"
              required
              v-model="userInfo.email"
            />
          </div>
          <div class="grid grid-cols-2 my-3">
            <label for="">Address:</label>
            <input
              type="text"
              class="border rounded-md"
              required
              v-model="userInfo.address"
            />
          </div>
          <div class="grid grid-cols-2 my-3">
            <label for="">Payment Method:</label>
            <select
              class="rounded-md"
              id="gender"
              name="payment_methods"
              v-model="userInfo.payment_method"
            >
              <option selected value="" disabled>---</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
          <div class="mt-4">
            <button
              type="button"
              class="inline-flex w-50 text-white font-bold border bg-blue-500 hover:bg-blue-700 border-blue-700 py-2 px-4 rounded-lg place-content-center"
              @click="handleConfirm"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  name: "CheckoutSummary",
})
export default class extends Vue {
  @Prop() order: any;
  userInfo: any = {
    id: "",
    fname: "",
    phone_number: "",
    address: "",
    email: "",
    payment_method: "",
  };
  handleConfirm() {
    this.userInfo.id = this.newId;
    this.order.push(this.userInfo);
    this.$vxm.product.handleConfirm(this.order);
  }

  get newId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 8;

    let randomID = "";
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters.charAt(randomIndex);
    }
    return randomID;
  }
}
</script>
