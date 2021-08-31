<template>
  <div id="app">
    <input type="text" v-model="text" />
    <span v-if="$v.text.youtubeMatch.$invalid">{{ $v.text.youtubeMatch.$message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import * as yup from "yup";
import { useVuelidate } from "@vuelidate/core";

const useCustomMatch = (str: string) => {
  return {
    $validator: (val: unknown): boolean => {
      const schema = yup
        .string()
        .matches(new RegExp(str), { excludeEmptyString: true });
      const _val = schema.validateSync(val);
      return !!_val;
    },
    $message: ({ $params }) => `The value is not ${$params.match} rule`,
    $params: {
      match: str,
    },
  }
}

const youtubeMatch = useCustomMatch('youtube')

export default defineComponent({
  setup() {
    const text = ref("")
    
    const rules = {
      text: {
        youtubeMatch,
      },
    };
    const $v = useVuelidate(rules, { text });

    return {
      $v,
      text,
    };
  },
  // validations: {
  //   state: {
  //     text: {
  //       youtubeMatch: youtubeMatch.$validator
  //     }
  //   }
  // }
});
</script>
