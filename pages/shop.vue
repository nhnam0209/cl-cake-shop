<template>
  <Default>
    <template #content>
      <div class="h-full">
        <product-list></product-list>
      </div>
    </template>
  </Default>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "ShopPage",
  head() {
    return {
      title: "ShopPage",
    };
  },
})
export default class extends Vue {}
</script>
