<template>
  <div id="app">
    <Foo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Foo from "./views/Foo.vue"

export default defineComponent({
  components: {
    Foo
  }
})
</script>