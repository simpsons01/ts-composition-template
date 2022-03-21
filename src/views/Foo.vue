<script>
import Bar from "./Bar.vue"
import Bob from "./Bob.vue"

export default {
  render(h) {
    return h(Bar, {
      scopedSlots: {
        bar: () => h(Bob)
      }
    })
  }
}
</script>

<style>

</style>