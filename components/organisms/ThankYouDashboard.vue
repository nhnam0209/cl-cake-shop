<template>
  <div class="mt-5 w-full">
    <div class="flex flex-col m-auto top-0 bottom-0 left-0 right-0 p-5">
      <div class="w-full lg:mx-4">
        <h1
          class="text-lg md:text-2xl lg:text-3xl w-full inline-flex justify-center"
        >
          THANK YOU
          <p class="font-bold mx-2">{{ order[2].fname }}</p>
          FOR SHOPPING !!
        </h1>
        <h1
          class="text-base md:text-2xl lg:text-3xl my-2 w-full inline-flex justify-center"
        >
          Your Order ID
          <p class="font-bold mx-2">{{ order[2].id }}</p>
          is processed and will deliver soon!!
        </h1>
        <div class="w-full justify-center text-center">
          <a
            class="nc-Button mt-5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
            href="/shop"
            >Go To Shop</a
          >
        </div>

        <br />
        <div class="w-full my-2 flex justify-center">
          <div class="w-72">
            <img src="../../static/img/celebrate.gif" alt="celebrate" />
          </div>
        </div>
        <div
          class="border border-solid lg:grid lg:grid-cols-6 rounded-lg border-slate-700"
        >
          <div class="lg:col-span-4 mx-1">
            <div class="w-full mx-2">
              <h1 class="text-2xl lg:text-3xl">
                <p class="ml-2">Order Detail</p>
              </h1>
              <div>
                <div class="text-lg inline-flex my-3 mx-2">
                  <p class="font-bold mr-2">Total:</p>
                  {{ order[1].total }} $
                </div>
              </div>
            </div>
            <div class="flex flex-wrap w-full lg:w-[700px] p-7">
              <div
                class="p-2 inline-flex"
                v-for="product in order[0]"
                :key="product.id"
              >
                <Card :product="product" :is-view-only="true" />
              </div>
            </div>
          </div>
          <div class="lg:col-span-2 mx-1 lg:mx-2">
            <div class="w-full col-span-2">
              <h1 class="text-2xl lg:text-3xl">Customer Infomation</h1>
              <br />
              <form class="bg-blue-200 rounded-lg p-7">
                <div class="grid grid-cols-2">
                  <label for="">Name:</label>
                  <p>{{ order[2].fname }}</p>
                </div>
                <div class="grid grid-cols-2 my-3">
                  <label for="">Phone:</label>
                  <p>{{ order[2].phone_number }}</p>
                </div>
                <div class="grid grid-cols-2 my-3">
                  <label for="">Email:</label>
                  <p>{{ order[2].mail }}</p>
                </div>
                <div class="grid grid-cols-2 my-3">
                  <label for="">Address:</label>
                  <p>{{ order[2].address }}</p>
                </div>
                <div class="grid grid-cols-2 my-3">
                  <label for="">Payment Method:</label>
                  <p>{{ order[2].payment_method }}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
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
}
</script>
