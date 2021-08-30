<template>
  <div class="container">
     <count-foo :count="count" />
     <foo>
       <template v-slot:default>
         <count :count="count" />
       </template>
     </foo>
     <foo></foo>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Foo from "@/compoonent/Foo.vue"
import Count from "@/compoonent/Count.vue"
import CountFoo from "@/compoonent/CountFoo.vue"

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  components: {
    Count,
    Foo,
    CountFoo
  }
})
</script>