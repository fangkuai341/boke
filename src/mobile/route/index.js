import { createRouter, createWebHashHistory } from "vue-router";
import bigTabs from '../compnets/BigTabs.vue'
import articleDelted from '../compnets/ArticleDelted.vue'
import search from '../compnets/search/index.vue'
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
        {
            path: "/search",
            component: search,
        },
    ],
});
export default router;
