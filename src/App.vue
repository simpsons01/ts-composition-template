<template>
  <div id="app">
    <div>
      <span>輸入</span>
      <input type="text" v-model.trim="userInput" @keydown.enter="addTodo" />
    </div>
    <div>
      <label>
        完成
        <input type="radio" v-model="status" :value="true" />
      </label>
      <label>
        未完成
        <input type="radio" v-model="status" :value="false" />
      </label>
    </div>
    <div>
      <p>列表</p>
      <div v-for="todoItem in calcTodo" :key="todoItem.id">
        <div>
          <input type="checkbox" v-model="todoItem.done" />
          <template>
            <span v-show="todoItem.id !== slectedUpdateTodoItem.id">
              {{ todoItem.content }}
            </span>
            <input
              v-show="todoItem.id === slectedUpdateTodoItem.id"
              v-model.trim="slectedUpdateTodoItem.content"
              type="text"
              @keydown.enter="updateTodo(slectedUpdateTodoItem)"
            />
          </template>
          <button
            v-on="{
              click: () =>
                todoItem.id !== slectedUpdateTodoItem.id
                  ? updateSelectedTodo(todoItem)
                  : clearSelectedTodo(),
            }"
            v-text="todoItem.id === slectedUpdateTodoItem.id ? '還原' : '更新'"
          />
          <button
            v-on="{
              click: () => deleteTodo(todoItem.id)
            }"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  computed,
} from "@vue/composition-api";
import useTodo from "./compose/useTodo";
import { ITodo } from "./store";

export default defineComponent({
  setup() {
    const status = ref(false);
    const userInput = ref("");
    const todo = ref<Array<ITodo>>([]);
    const { calcTodo } = useTodo(status, todo);
    const slectedUpdateTodoItem = reactive<ITodo>({
      content: "",
      id: "",
      done: false,
    });

    const createTodo = (val: string) => ({
      id: `${Date.now()}`,
      content: val,
      done: false,
    });

    const addTodo = (val: string) => {
      const todoItem = createTodo(userInput.value);
      todo.value = [...todo.value, todoItem];
      userInput.value = ""
    };

    const deleteTodo = (id: string) => {
      todo.value = todo.value.filter((x) => x.id !== id);
    };

    const updateTodo = (todoItem: ITodo) => {
      todo.value = todo.value.map(x =>  x.id === todoItem.id ? { ...x, ...todoItem } : x);
      clearSelectedTodo();
    };

    const clearSelectedTodo = () => {
      slectedUpdateTodoItem.content = "";
      slectedUpdateTodoItem.id = "";
      slectedUpdateTodoItem.done = false;
    };

    const updateSelectedTodo = (todo: ITodo) => {
      clearSelectedTodo();
      (Object.keys(todo) as Array<keyof ITodo>).forEach((key) => {
        (slectedUpdateTodoItem as any)[key] = todo[key];
      });
    };

    return {
      status,
      userInput,
      todo,
      calcTodo,
      addTodo,
      deleteTodo,
      updateTodo,
      slectedUpdateTodoItem,
      updateSelectedTodo,
      clearSelectedTodo,
    };
  },
});
</script>
