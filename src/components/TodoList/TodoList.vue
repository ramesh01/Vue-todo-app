<script setup lang="ts">
  const props = defineProps(['todoListArr']);

  const getTransformedTodo = (todo: string) => {
    return todo.length > 20 ? `${todo.substring(0, 20)}...` : todo;
  }
</script>

<template>
    <div class="todo-list-container">
        <span v-if="todoListArr.todosArr.length === 0">No Todos</span>
        <template v-for="(todo, index) in todoListArr.todosArr">
            <div class="todo-item">
              <span class="todo-item-content" :title="todo">{{getTransformedTodo(todo)}}</span>
              <button class="btn btn-primary btn-sm" @click="$emit('editTodo',todo, index)">Edit</button>
              <button class="btn btn-error btn-sm" @click="$emit('deleteTodo', todo)">Delete</button>
            </div>
        </template>
    </div>
</template>

<style scoped>
.todo-item {
    margin-top: 5px;
}
.todo-list-container {
    margin-top: 20px;
}

.todo-item-content {
    display: inline-block;
    width: 40%;
    word-break: break-word;
    cursor: pointer;
    text-align: left;
}
</style>
