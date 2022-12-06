import { createRouter, createWebHashHistory } from "vue-router";
import bigTabs from '../compnets/BigTabs.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: bigTabs,
        },
    ],
});
export default router;
