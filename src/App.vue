<template>
  <div id="app">
    <container :count="count" />

    test: {{ a }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Container from "@/compoonent/Container.vue"
import { a } from "@/compoonent/a"

export default defineComponent({
  components: {
    Container
  },
  setup() {
    const count = ref(1)

    return {
      a,
      count
    }
  },
})
</script>
