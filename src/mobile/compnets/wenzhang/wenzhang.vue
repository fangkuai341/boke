<template>
  <div v-for="item in weizhangs.wenzhang" :key="item.id" @click="goto(item.id)">
    <div>{{ item.title }}</div>
    <div>{{ item.introduction }}</div>

    <div><img :src="getImgSrc(item.id)" style="width: 90vw" /></div>
    <div></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const weizhangs = defineProps(["wenzhang"]);
const router = useRouter();
const getImgSrc = (id) => {
  let img;
  for (let i = 0; i < weizhangs.wenzhang.length; i++) {
    if (weizhangs.wenzhang[i].id == id) {
      img = JSON.parse(weizhangs.wenzhang[i].img)[0];
    }
  }
  return img;
};
const goto = (id) => {
  router.push({ path: `/article/${id}` });
};
</script>

<style></style>
