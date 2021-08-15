import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface ITodo {
  id: string,
  content: string,
  done: boolean
}

export interface RootState {
  todo: Array<ITodo>
}

export default new Vuex.Store<RootState>({
  state: {
    todo: []
  },
  mutations: {
    updateTodo(state, payload) {
      state.todo = [...payload]
    }
  },
  actions: {
    addTodo({ commit, state }, payload: ITodo) {
      commit("updateTodo", [...state.todo, payload])
    },
    delTodo({ commit, state }, id: ITodo['id']) {
      commit(
        "updateTodo", 
        state.todo.filter(todoItem => todoItem.id !== id)
      )
    },
    updateTodo({ commit, state }, payload: ITodo) {
      commit(
        "updateTodo", 
        state.todo.map(todoItem => {
          return todoItem.id === payload.id ? {...todoItem, ...payload } : todoItem
        })
      )
    },
  },
  modules: {
  }
})