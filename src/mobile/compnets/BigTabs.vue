<template>
  <!-- 粘性约束元素 -->
  <div style="display: inline-block">
    <div class="title">
      <div v-for="item in tabs" :key="item.id">{{ item.name }}</div>
    </div>
    <div class="topbg">
      <div style="margin-top: 30px">
        <input type="text" style="width: 90vw" />
      </div>
    </div>
    <!-- sticky 元素 -->
    <div
      style="
        width: 100vw;
        height: 20px;
        background-color: #fff;
        z-index: 10;
        position: sticky;
        margin-top: 140px;
        top: 30px;
      "
    ></div>
    <div
      style="
        width: 100vw;
        background-color: #fff;
        z-index: 10;
        position: relative;
      "
    >
      <WenZhang :wenzhang="weizhangs" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import WenZhang from "@/mobile/compnets/wenzhang/wenzhang.vue";
const tabs = [
  { name: "博客文章", img: "a", id: "a" },
  { name: "留言", img: "b", id: "b" },
  { name: "关注我", img: "c", id: "c" },
];
const weizhangs = ref([]);
onMounted(async () => {
  await axios({
    method: "GET",
    url: "./wenzi/getCart",
  }).then((res) => {
    weizhangs.value = res.data.data.reverse();
  });
});
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
  margin-top: -30px;
}
.title {
  height: 30px;
  position: sticky;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  background: #fff;
  div {
    margin-right: 20px;
    font-weight: 600;
    font-size: 20px;
  }
}
</style>
