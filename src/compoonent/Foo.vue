<template>
  <father-foo>
    <template v-slot:father>
      <template v-if="!$slots.default">
        2
      </template>
      <template v-else>
        <slot />
      </template>
    </template>
  </father-foo>
</template>

<script>
import FatherFoo from "./FatherFoo.vue";
export default {
  components: {
    FatherFoo,
  },
};
</script>

<style>
</style>