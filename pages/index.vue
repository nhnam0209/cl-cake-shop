<template>
  <Default>
    <template #content>
      <div class="h-screen">
        <div class="z-0">
          <div class="h-full flex justify-center">
            <div class="top-0 text-center">
              <div
                class="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-full"
              >
                <h2
                  class="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight"
                >
                  Welcome to Cakeshop <br />
                </h2>
                <span class="block mt-6 text-slate-500 dark:text-slate-400"
                  >With Cake Shop you will get freeship and savings
                  combo...</span
                >
                <a
                  class="nc-Button mt-5 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 hover:text-white"
                  href="/shop"
                  >Go To Shop</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Default>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "HomePage",
  head() {
    return {
      title: "Home",
    };
  },
})
export default class extends Vue {}
</script>
