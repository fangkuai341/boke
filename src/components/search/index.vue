<template>
  <div class="search">
    <input type="text" v-model="inputValue" @keydown="keydown" />
    <i class="iconfont icon-sousuo" @click="showInput"></i>
    <Allcard :cardData="cardData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Allcard from "@/components/search/Allcard.vue";
const router = useRouter();
const route = useRoute();
const inputValue = ref(route.params.keyword);
const cardData = ref();
const keydown = (e) => {
  if (!inputValue.value) {
    return;
  }
  if (e.code === "Enter") {
    router.push({ path: `/search/${inputValue.value}` });
  }
};
const showInput = () => {
  router.push({ path: `/search/${inputValue.value}` });
};
onMounted(async () => {
  await axios({
    method: "GET",
    url: `./wenzi/getsearchCartByUser?serchCon=${inputValue.value}`,
  }).then((res) => {
    if (res.data.code === 200) {
      cardData.value = res.data.data;
    }
  });
});
</script>

<style scoped lang="less">
.search {
  margin: 80px auto 0;
  overflow: hidden;
  position: relative;
  input {
    background-color: #fff;
    border: none;
    border-radius: 30px;
    font-family: inherit;
    font-size: inherit;
    height: 30px;
    outline: none;
    padding-inline-end: 44px;
    padding-inline-start: 52px;
    width: 250px;
    margin: 0 auto;
    display: block;
  }
  .icon-sousuo {
    position: absolute;
    left: calc(50% - 155px);
    top: 8px;
  }
}
</style>
