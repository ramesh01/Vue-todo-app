<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, onUnmounted, reactive } from 'vue';
const todoListArr = ref({todosArr: []});
const todoInput = ref('');
const editTodoItem = ref(null);
const input = ref(null);

watch(todoInput, async (newTodoInput, oldTodoInput) => {
  console.log("new:", newTodoInput);
  console.log("old:", oldTodoInput);
});

onMounted(() => {
  input.value.focus()
})

const addTodoItem = (event: any) => {
  if (todoInput.value.trim() === '') {
    return;
  }
  if (editTodoItem.value === null) {
    todoListArr.value.todosArr.push(todoInput.value);
  } else {
    // update todoList
    todoListArr.value.todosArr = todoListArr.value.todosArr.map((el, index) => {
      if (index === editTodoItem.value) {
        return todoInput.value;
      } else {
        return el;
      }
    });
  }
  todoInput.value = '';
  editTodoItem.value = null;
}

const getTransformedTodo = (todo: string) => {
  return todo.length > 20 ? `${todo.substring(0, 20)}...` : todo;
}

const editTodo = (todo: string, index: number) => {
 todoInput.value = todo;
 editTodoItem.value = index;
}

const deleteTodo = (todo: string) => {
  const temp = todoListArr.value.todosArr.filter(el => {
    return todo !== el
  });
  todoListArr.value.todosArr = temp;
}

</script>

<template>
  <div class="todo-input-container">
    <div class="">
        <input ref="input" v-model.lazy.trim="todoInput" class="todo-input-field" type="text" placeholder="Enter Todo" />
        <button class="btn-primary btn btn-add-todo" type="button" @click="addTodoItem()">
        {{editTodoItem === null ? 'Add' : 'Update'}}
        </button>
    </div>
    <div class="todo-list-container">
      <span v-if="todoListArr.todosArr.length === 0">No Todos</span>
      <template v-for="(todo, index) in todoListArr.todosArr">
        <div class="todo-item">
        <span class="todo-item-content" :title="todo">{{getTransformedTodo(todo)}}</span>
        <button class="btn btn-primary btn-sm" @click="editTodo(todo, index)">Edit</button>
        <button class="btn btn-error btn-sm" @click="deleteTodo(todo)">Delete</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.todo-input-field {
  padding: 2px 10px;
  height: 30px;
}
.todo-list-container {
  margin-top: 20px;
}
.btn-add-todo {
  margin-left: 4px;
}
.todo-item {
  margin-top: 5px;
}
.todo-item-content {
  display: inline-block;
  width: 40%;
  word-break: break-word;
  cursor: pointer;
  text-align: left;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn-error {
  margin-left: 4px;
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
</style>