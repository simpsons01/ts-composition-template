<template>
  <div>{{ count }}</div>
</template>

<script>
import Vue from "vue"
import ICount from "./ICount.ts"

export default {
  extends: Vue.extend({}).extend(ICount)
}
</script>