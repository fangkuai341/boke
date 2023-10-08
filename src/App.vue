<template>
  <div class="updateCurr">
    <div class="bg" ref="bgDom"></div>
    <NavBar />
    <div class="sssss">冀ICP备2022021189</div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script setup>
import * as PIXI from "pixi.js";
import NavBar from "@/components/NavBar.vue";
import { onMounted, ref } from "vue";
import { startSakura } from "@/hook/FloDown";
import { useStore } from "./store/index.js";
const store = useStore();
const bgDom = ref(null);
onMounted(async () => {
  let img = new Image();
  img.src = require("@/assets/images/bg.jpg");
  img.onload = () => {
    bgDom.value.style.backgroundImage = `url(${img.src})`;
  };
  startSakura();
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
<style lang="less" scoped>
.updateCurr {
  cursor: url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur),
    auto;
}
.bg {
  background: url("@/assets/images/smallBg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  z-index: -1;
}
.sssss {
  width: 160px;
  position: fixed;
  top: 100%;
  left: 100%;
  transform: translateX(-100%) translateY(-100%);
}
</style>
