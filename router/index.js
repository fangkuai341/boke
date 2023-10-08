import { createRouter, createWebHashHistory } from "vue-router";
import wenzhang from "@/components/article/index";
import allWenzi from "@/components/home/AllWenzi.vue";
import search from "@/components/search/index";
import meg from "@/components/message/index";
import miyosummer from "@/components/miyosummer/index";
import fenli from "@/components/search/fenli/index";
import game from "@/components/game/index";
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
    {
      path: "/message",
      component: meg,
    },
    {
      path: "/miyosummer",
      component: miyosummer,
    },
    {
      path: "/game",
      component: game,

    },
    {
      path: "/classification/:keyword",
      component: fenli,
    },
  ],
});
export default router;
