<script>
export default {
  name: "Bar",
  props: {
    message: {
      type: String
    }
  },
  render(h) {
    const defaultSlot = this.$scopedSlots.default({ text:  this.message})
    const barDefault = this.$scopedSlots.bar({ value: "bar" })
    return h("p", [
      defaultSlot,
      barDefault
    ])
  }
}
</script>

<style>

</style>