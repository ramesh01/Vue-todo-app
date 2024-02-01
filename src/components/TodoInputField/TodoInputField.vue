<script setup lang="ts">
import { ref, toRef, watch, onMounted, onUpdated, onUnmounted, reactive, watchEffect } from 'vue';
const props = defineProps(['isTodoItemEdit', 'todoInput']);

const inputValue = ref('');
const input = ref(null);

watchEffect(() => inputValue.value = props.todoInput);

onMounted(() => {
  input.value.focus();
});

const emit = defineEmits('addTodoItem');
function buttonClick() {
  emit('addTodoItem', inputValue);
  inputValue.value = '';
}
</script>

<template>
    <div class="todo-input-container">
        <div class="">
            <input ref="input" v-model.lazy.trim="inputValue" class="todo-input-field" type="text" placeholder="Enter Todo" />
            <button class="btn-primary btn btn-add-todo" type="button" @click="buttonClick">
            {{props.isTodoItemEdit === null ? 'Add' : 'Update'}}
            </button>
        </div>
    </div>
</template>

<style scoped>
.todo-input-field {
    padding: 2px 10px;
    height: 30px;
}

.btn-add-todo {
    margin-left: 4px;
}
</style>