import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '',
        name: "Todo",
        component: () => import('../views/Todo/Todo.vue')
    },
    {
        path: '/forms',
        name: "vue-forms",
        component: () => import('../views/Forms/Forms.vue')
    }]
});

export default router;