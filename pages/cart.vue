<template>
  <Default>
    <template #content>
      <div class="h-full">hello</div>
    </template>
  </Default>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "CartPage",
  layout: "cake-shop-layout",
  head() {
    return {
      title: "Cart",
    };
  },
})
export default class extends Vue {}
</script>
