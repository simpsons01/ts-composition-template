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
          <input type="checkbox" :checked="todoItem.done" @change="updateTodo({ done: $event.target.value, content: todoItem.content, id: todoItem.id })" />
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
  computed,
  defineComponent,
  reactive,
  ref
} from "@vue/composition-api";
import useTodo from "./compose/useTodo";
import { ITodo } from "./store";

export default defineComponent({
  setup(props, context) {
    // data
    const status = ref(false);
    const userInput = ref("");
    const store = (context.root as any).$store
    const calcTodo = useTodo(status, store.state)
    const slectedUpdateTodoItem = reactive<ITodo>({
      content: "",
      id: "",
      done: false,
    });
    
    // methods
    const createTodo = (val: string) => ({
      id: `${Date.now()}`,
      content: val,
      done: false,
    });

    const addTodo = () => {
      const todoItem = createTodo(userInput.value);
      store.dispatch("addTodo", todoItem)
      userInput.value = ""
    };

    const deleteTodo = (id: string) => {
      store.dispatch("delTodo", id)
    };

    const updateTodo = (todoItem: ITodo) => {
      store.dispatch("updateTodo", todoItem)
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
      calcTodo,
      addTodo,
      deleteTodo,
      updateTodo,
      slectedUpdateTodoItem,
      updateSelectedTodo,
      clearSelectedTodo
    };
  },
});
</script>
