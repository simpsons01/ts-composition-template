<template>
  <div id="app">
      <foo message="123" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Foo from "./views/Foo.vue"

export default defineComponent({
  components: {
    Foo
  }
})
</script>

<div>
 <p>
   <a>123</a>
 </p>
</div>