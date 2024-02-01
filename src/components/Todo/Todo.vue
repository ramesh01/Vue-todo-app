<script setup lang="ts">
    import { ref, watch, onMounted, onUpdated, onUnmounted, reactive } from 'vue';
    import TodoInputField from "../TodoInputField/TodoInputField.vue"
    import TodoList from "../TodoList/TodoList.vue"

    const todoInput = ref('');
    const todoListArr = ref({todosArr: []});
    const editTodoItem = ref(null);

  const handleAddTodoItem = (event: any) => {
    todoInput.value = event.value;
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
<TodoInputField @addTodoItem="handleAddTodoItem"
:isTodoItemEdit="editTodoItem"
:todoInput="todoInput" />
<TodoList 
    :todoListArr="todoListArr"
    @editTodo="editTodo"
    @deleteTodo="deleteTodo"
 />
</template>
<style scoped>
</style>