import { createRouter, createWebHashHistory } from 'vue-router';
import wenzhang from '@/components/article/index'
import allWenzi from '@/components/home/AllWenzi.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: allWenzi
        },
        {
            path: '/article/:id',
            component: wenzhang
        }
    ]
});
export default router