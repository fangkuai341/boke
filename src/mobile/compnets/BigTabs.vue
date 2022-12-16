<template>
  <div>
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
      <div class="femliCards">
        <div v-for="(item, index) in fenli" :key="item.name" class="fenliCard">
          <img
            :src="require(`@/assets/images/mobile/topImg/a-${index + 1}.jpg`)"
            style="width: 40px"
          />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <AllWz />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AllWz from "./wenzhang/allWz.vue";
const nowTab = ref(0);
const tabs = [
  { name: "博客文章", img: "a" },
  { name: "留言", img: "b" },
  { name: "关注我", img: "c" },
];
const fenli = [
  { name: "技术" },
  { name: "游戏" },
  { name: "动漫" },
  { name: "鬼畜" },
  { name: "随机文章" },
];
const img = ref();
const tabClick = (imgUrl, index) => {
  nowTab.value = index;
  img.value.src = require(`@/assets/images/mobile/topImg/${imgUrl}.jpg`);
};
</script>

<style scoped lang="less">
.top {
  height: 200px;
  width: 100vw;
  position: relative;
}
.img {
  height: 100%;
  width: 100%;
  position: absolute;
  filter: brightness(0.7);
  z-index: -1;
}
.tabs {
  display: flex;
  margin: 0 10px;
  div {
    margin-right: 20px;
    color: #fff;
    font: 28px tahoma, arial, "Hiragino Sans GB", \5b8b\4f53, sans-serif;
  }
}
.inputText {
  border-radius: 25px;
  margin: 15px 10px 0;
  height: 25px;
  width: 80vw;
  background: rgba(0, 0, 0, 0.4);
  border: transparent;
  outline: none;
}
.femliCards {
  display: flex;
  margin-top: 20px;
}
.fenliCard {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}
.name {
  margin-top: 5px;
  color: #fff;
  font: 15px tahoma, arial, sans-serif;
}
</style>
