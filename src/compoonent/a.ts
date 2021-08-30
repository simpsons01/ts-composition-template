import { reactive } from "@vue/composition-api"

export let a = reactive({a: 1})

export const update = (val: any) => a = val

export const get = () => a