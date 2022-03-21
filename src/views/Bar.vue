<script>
export default {
  render(h) {
    const bar = this.$scopedSlots.bar()
    return h("h1", [
      bar
    ])
  }
}
</script>

<style>

</style>