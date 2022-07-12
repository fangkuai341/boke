import { createRouter, createWebHashHistory } from "vue-router";
import wenzhang from "@/components/article/index";
import allWenzi from "@/components/home/AllWenzi.vue";
import search from "@/components/search/index";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: allWenzi,
    },
    {
      path: "/article/:id",
      component: wenzhang,
    },
    {
      path: "/search/:keyword",
      component: search,
    },
  ],
});
export default router;
