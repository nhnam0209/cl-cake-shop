<template>
  <nav
    class="h-16 lg:h-24 flex justify-between overflow-hidden bg-white w-full z-10 top-0 border-b border-solid border-gray-200"
  >
    <div
      class="bg-no-repeat bg-cover bg-center w-32 h-full mx-5 my-auto flex justify-center"
    >
      <NuxtLink to="/" class="flex justify-center align-center">
        <span class="self-center text-2xl lg:text-4xl font-bold"
          >Cake Shop.</span
        >
      </NuxtLink>
    </div>
    <div class="navbar-list-items flex justify-center items-center">
      <div class="inline-flex">
        <NuxtLink
          class="navbar-items mx-4 p-4 text-xl rounded-full hover:bg-slate-100"
          to="/"
          >Home</NuxtLink
        >
        <NuxtLink
          class="navbar-items mx-4 p-4 text-xl rounded-full hover:bg-slate-100"
          to="/shop"
          >Shop</NuxtLink
        >
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div>
        <button class="relative">
          <NuxtLink
            class="navbar-items text-xl mx-5 rounded-full p-5"
            to="/cart"
            ><cart />
            <div
              class="p-3 w-3 h-3 flex relative bg-red-500 text-white mx-auto my-auto rounded-full"
            >
              <div
                class="absolute top-2 flex justify-center self-center text-sm right-[8px] top-[1px]"
              >
                {{ itemsInCart }}
              </div>
            </div></NuxtLink
          >
        </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component({
  name: "NavigationBar",
})
export default class extends Vue {
  carts = [];
  itemsInCart = 0;

  created() {
    if (localStorage.getItem("cart")) {
      const cartData = JSON.parse(localStorage.cart);
      this.$vxm.product.setCart(cartData);
      this.carts = cartData;
    }
  }

  mounted() {
    this.itemsInCart = this.carts.length;
  }
}
</script>

<style>
.navbar-icon-list {
  display: none;
}

.split-bar::before {
  content: "";
  position: absolute;
  border-right: 2px solid black;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: -1;
}

.navigation-subnav {
  position: relative;
}

.navigation-subnav::before {
  content: "";
  position: absolute;
  top: 25px;
  width: 100px;
  right: 0;
  height: 30px;
}

.navbar-items:hover::before {
  width: 100%;
}

@media (max-width: 1024px) {
  .navbar-list-items {
    display: none;
  }
}
</style>
