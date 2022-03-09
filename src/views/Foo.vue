<script>
import Bar from "./Bar.vue"
export default {
  props: {
    message: {
      type: String
    }
  },
  components: {
    Bar
  },
  render(h) {
    return h("div", {
      class: {
        foo: true
      }
    },[
      h("Bar", {
        props: {
          message: this.message
        },
        scopedSlots: {
          default({ text }) {
            return h("a", text)
          },
          bar({ value }) {
            return h("p", value)
          }
        }
      })
    ])
  }
}
</script>

<style>

</style>