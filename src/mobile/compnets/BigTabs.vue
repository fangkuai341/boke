<template>
  <!-- 粘性约束元素 -->
  <div style="display: inline-block">
    <div class="title" ref="titDom">
      <div
        v-for="(item, index) in tabs"
        :key="item.id"
        :style="{ fontWeight: nowId === index ? 600 : 500 }"
        @click="titClick(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div
      style="position: fixed; z-index: 99; top: 32px; left: 0"
      ref="inputDom"
    >
      <input
        type="text"
        style="width: 90vw; height: 20px"
        @click="gotoSearch"
      />
    </div>
    <div class="topbg" ref="topBg"></div>
    <!-- sticky 元素 -->
    <div
      style="
        width: 100vw;
        height: 30px;
        background-color: #fff;
        z-index: 10;
        position: sticky;
        margin-top: 140px;
        top: 32px;
        border-radius: 10px 10px 0px 0px;
      "
      ref="allTopWz"
    ></div>
    <div
      style="
        width: 100vw;
        background-color: #fff;
        z-index: 10;
        position: relative;
        overflow: hidden;
        max-height: calc(100vh - 50px);
      "
      ref="allWz"
      @scroll="allWzScroll"
    >
      <WenZhang :wenzhang="weizhangs" v-if="nowId === 0" />
      <Liuyan v-if="nowId === 1" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import WenZhang from "@/mobile/compnets/wenzhang/wenzhang.vue";
import Liuyan from "@/mobile/compnets/liuyan.vue";
import { useRouter } from "vue-router";
const nowId = ref(0);
const router = useRouter();
const tabs = [
  { name: "博客文章", img: "a", id: "a" },
  { name: "留言", img: "b", id: "b" },
  { name: "关注我", img: "c", id: "c" },
];
const weizhangs = ref([]);
const topBg = ref();
const allTopWz = ref();
const allWz = ref();
const inputDom = ref();
const titDom = ref();
const titClick = (item, index) => {
  nowId.value = index;
  let img = require(`@/assets/images/mobile/topImg/${item.img}.jpg`);
  topBg.value.style.backgroundImage = `url(${img})`;
};
const gotoSearch = () => {
  router.push("/search");
};
onMounted(async () => {
  await axios({
    method: "GET",
    url: "./wenzi/getCart",
  }).then((res) => {
    weizhangs.value = res.data.data.reverse();
  });
  window.addEventListener("scroll", () => {
    if (allTopWz.value.offsetTop - document.documentElement.scrollTop <= 32) {
      allWz.value.style.overflow = "auto";
    } else {
      allWz.value.style.overflow = "hidden";
    }
    if (allTopWz.value.offsetTop - document.documentElement.scrollTop <= 62) {
      //62到32
      //输入框上去
      //top  32-->2
      inputDom.value.style.top = `${
        allTopWz.value.offsetTop - document.documentElement.scrollTop - 30
      }px`;
      inputDom.value.style.left = `${
        62 - (allTopWz.value.offsetTop - document.documentElement.scrollTop)
      }px`;
      //文字渐变隐藏
      //top  1-->0
      titDom.value.style.opacity =
        (1 / 30) *
          (allTopWz.value.offsetTop - document.documentElement.scrollTop) -
        32 / 30;
      // 𝑦=1/30 𝑥−32/30
    } else {
      //输入框下来
      //文字渐变显示
    }
  });
});

// const allWzScroll = (event) => {
//   console.log(document.body.scrollTop);
// };
</script>

<style lang="less" scoped>
.topbg {
  width: 100vw;
  height: 200px;
  //background-color: blue;
  position: fixed;
  background-image: url(@/assets/images/mobile/topImg/a.jpg);
  background-size: cover;
  filter: brightness(70%);
  margin-top: -32px;
}
.title {
  height: 30px;
  position: sticky;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  margin-left: 4px;
  div {
    margin-right: 20px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
