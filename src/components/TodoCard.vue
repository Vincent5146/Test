<template>
  <div class="todoitems">
    <label :for="todo.id" class="checkbox">
      <input
        :checked="todo.complete"
        @change="todoItemClick(todo.id)"
        type="checkbox"
        class="checkbox-input"
        :id="todo.id"
      />
      <span>{{ todo.title }}</span>
    </label>
    <a @click="deleteTodoItem(todo.id)" class="delete"></a>
  </div>
</template>

<script>
export default {
  props: {
    todoProps: {
      type: Object,
      default: () => ({})
    },
    todoItemClick: {
      type: Function,
      default: () => {}
    },
    deleteTodoItem: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      todo: JSON.parse(JSON.stringify(this.todoProps))
    }
  }
}
</script>
