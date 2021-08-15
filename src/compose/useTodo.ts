import { computed, Ref } from "@vue/composition-api"
import { ITodo } from "../store"

export default function useTodo(status: Ref<boolean> ,todo: Ref<Array<ITodo>>) {
   const calcTodo = computed(() => {
     return todo.value.filter(todoItem => todoItem.done === status.value)
   })

   return {
     calcTodo
   }
}