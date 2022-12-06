<template>
  <div class="top">
    <img
      src="@/assets/images/mobile/topImg/a.jpg"
      alt=""
      class="img"
      ref="img"
    />
    <div class="tabs">
      <div
        v-for="(item, index) in tabs"
        :key="item"
        @click="tabClick(item.img, index)"
        :style="{ fontWeight: index === nowTab ? 600 : 500 }"
      >
        {{ item.name }}
      </div>
    </div>
    <input type="text" class="inputText" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const nowTab = ref(0);
const tabs = [
  { name: "博客文章", img: "a" },
  { name: "留言", img: "b" },
  { name: "关注我", img: "c" },
];
const img = ref();
const tabClick = (imgUrl, index) => {
  nowTab.value = index;
  img.value.src = require(`@/assets/images/mobile/topImg/${imgUrl}.jpg`);
};
</script>

<style scoped lang="less">
.top {
  height: 20vh;
  width: 100vw;
  position: relative;
}
.img {
  height: 100%;
  width: 100%;
  position: absolute;
  filter: brightness(0.5);
  z-index: -1;
}
.tabs {
  display: flex;
  margin: 0 10px;
  div {
    margin-right: 20px;

    font-size: 28px;
    color: #fff;
  }
}
.inputText {
  margin-top: 15px;
  border-radius: 25px;
  margin: 0 10px;
  height: 25px;
  width: 80vw;
  background: rgba(0, 0, 0, 0.4);
  border: transparent;
}
</style>
