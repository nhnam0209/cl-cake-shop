<template>
  <div>
    <div
      class="p-5 w-full sm:w-[600px] md:w-[700px] rounded-lg overflow-hidden shadow-lg"
    >
      <div class="w-full flex justify-end">
        <button
          v-if="!isViewOnly"
          class="flex cursor-pointer w-5 h-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded-lg place-content-center"
          @click="removeProduct($event)"
        >
          <span class="flex justify-center self-center">X</span>
        </button>
      </div>
      <div class="inline-flex w-full">
        <div class="w-[150px]">
          <img class="w-full" :src="product.image_url" :alt="product.name" />
        </div>
        <div class="flex flex-col ml-4">
          <div class="font-bold text-xl mb-2">{{ product.name }}</div>
          <p class="text-gray-700 text-base">{{ product.final_price }} $</p>
          <p class="text-gray-700 text-base">
            {{ product.description }}
          </p>
          <div v-if="isViewOnly" class="flex flex-col">
            <p>Quantity: {{ product.quantity }}</p>
            <div>
              <p v-if="product.note">Note: {{ product.note }}</p>
              <p v-else>No Note</p>
            </div>
          </div>
          <div v-else class="inline-flex justify-between w-full mt-4">
            <div class="">
              <div class="mt-2 flex inline-flex">
                <div class="border w-fit rounded-md">
                  <button class="py-1 px-2 border-r" @click="decreaseValue">
                    -
                  </button>
                  <span class="p-2">
                    {{ product.quantity }}
                  </span>
                  <button
                    class="py-1 px-2 border-l"
                    :class="[
                      product.quantity === product.stock_count
                        ? 'bg-slate-100'
                        : '',
                    ]"
                    @click="increaseValue"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="">
              <button
                class="border py-3 px-4 flex hover:bg-slate-100 rounded-md"
                @click="openNote"
              >
                <span v-if="isOpen">Close Note</span>
                <span v-else> Add Note </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "nuxt-property-decorator";
@Component({
  name: "Card",
})
export default class extends Vue {
  @Prop({ type: Object, required: false }) product!: any;
  @Prop({ type: Boolean, required: false }) isOpen!: boolean;
  @Prop({ type: Boolean, required: false }) isViewOnly!: boolean;

  @Emit()
  increaseValue() {
    return this.$emit("increase");
  }

  @Emit()
  decreaseValue() {
    return this.$emit("decrease");
  }

  @Emit()
  removeProduct(e: any) {
    return this.$emit("click", e);
  }

  @Emit()
  openNote() {
    return this.$emit("openNote");
  }
}
</script>
<style></style>
