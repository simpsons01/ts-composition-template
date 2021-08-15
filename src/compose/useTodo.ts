import { computed, Ref } from "@vue/composition-api"
import { RootState } from "../store"

export default function useTodo(status: Ref<boolean> ,state: RootState) {
   const calcTodo = computed(() => {
     return state.todo.filter(todoItem => todoItem.done === status.value)
   })

   return calcTodo
}