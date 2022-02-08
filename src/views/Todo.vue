/* eslint-disable no-undef */
<template>
  <div class="container">
    <h1>TODO LIST</h1>
    <div class="card input">
      <input
        v-model.trim="inputItem"
        id="inputTodo"
        type="text"
        class="text"
        placeholder="請輸入代辦事項"
      />
      <button @click="createItem" class="btn_add" type="button">+</button>
    </div>
    <div class="card card_list">
      <ul class="tab">
        <li
          v-for="(tab, index) in tabs"
          :class="['tab-item', { active: todoStatus === tab.value }]"
          :key="index"
        >
          <input type="radio" :id="tab.value" :value="tab.value" v-model="todoStatus" />
          <label :for="tab.value">{{ tab.name }}</label>
        </li>
      </ul>
      <div class="cart_content">
        <TodoCard
          :todoProps="todo"
          v-for="todo in computedTodos"
          :todoItemClick="handleTodoClick"
          :deleteTodoItem="deleteTodoItem"
          :key="todo.id"
        ></TodoCard>
        <div class="list_footer">
          <p class="footerP">共 {{ todos.length}} 個項目</p>
          <button @click="delAllItem()" type="button">
            刪除已完成項目
          </button>
        </div>
        <p>備注欄：</p>
        <select name="forgotThings">
          <option>好像忘了甚麼?</option>
          <option value="" v-for="forgotThing in forgotThings" :key="forgotThing.title">{{ forgotThing.title }}</option>
        </select>
        <div>
          <button @click="sendGet" class="btn_add" type="button">!</button>
        </div>
        <p>現在時間: {{ currentTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TodoCard from '@/components/TodoCard.vue'
import axios from 'axios'

export default {
  components: { TodoCard },
  data () {
    return {
      todoStatus: 'all',
      inputItem: '',
      currentTime: dayjs().format('YYYY/MM/DD | HH:mm'),
      tabs: [
        { value: 'all', name: 'All' },
        { value: 'complete', name: 'Complete' },
        { value: 'incomplete', name: 'Incomplete' }
      ],
      todos: [
        {
          title: 'coding',
          complete: false,
          id: 1
        },
        {
          title: 'jogging',
          complete: false,
          id: 2
        },
        {
          title: 'crying',
          complete: false,
          id: 3
        }
      ],
      forgotThings: []
    }
  },
  computed: {
    computedTodos () {
      let result
      switch (this.todoStatus) {
        case 'all':
          result = this.todos
          break
        case 'complete':
          result = this.todos.filter((todo) => todo.complete)
          break
        case 'incomplete':
          result = this.todos.filter((todo) => !todo.complete)
          break
      }
      return result
    }
  },
  methods: {
    createItem () {
      const todo = {
        title: this.inputItem,
        complete: false,
        id: new Date().getTime()
      }
      this.todos.push(todo)
      this.inputItem = ''
    },
    handleTodoClick (todoId) {
      const selectedIndex = this.todos.findIndex((todo) => todoId === todo.id)
      this.todos[selectedIndex].complete = !this.todos[selectedIndex].complete
    },
    deleteTodoItem (todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId)
    },
    delAllItem () {
      this.todos = this.todos.filter((todo) => !todo.complete)
    },
    sendGet () {
      axios.get('https://mocki.io/v1/81746e3a-94e0-4a2a-87ca-ecb9fed04420')
        .then((response) => {
          this.forgotThings = response.data
          console.log(this.forgotThings)
        })
    }
  }
}
</script>

<style lang="css">
  .app {
    margin: 0 auto;
  }
</style>
