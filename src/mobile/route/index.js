import { createRouter, createWebHashHistory } from "vue-router";
import bigTabs from '../compnets/BigTabs.vue'
import articleDelted from '../compnets/ArticleDelted.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: bigTabs,
        },
        {
            path: "/article/:id",
            component: articleDelted,
        },
    ],
});
export default router;
