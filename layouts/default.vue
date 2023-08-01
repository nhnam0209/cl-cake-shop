<template>
  <div>
    <!-- <slot name="header"> </slot> -->
    <slot name="content">
      <navigation-bar />

      <Nuxt />
    </slot>
    <!-- <slot name="footer"> Footer </slot> -->
  </div>
</template>
<script>
export default { layout: "CakeShopLayout" };
</script>
