<template>
  <Allcard
    :cardData="cardData"
    style="margin-top: 80px"
    v-if="cardData.length"
  />
  <div v-else class="nowenzhang">
    <div>还没有文章哦</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Allcard from "@/components/search/Allcard.vue";
import axios from "axios";
const route = useRoute();
const inputValue = ref(route.params.keyword);
const cardData = ref([]);
onMounted(async () => {
  await axios({
    method: "GET",
    url: `http://116.204.65.53/wenzi/getsearchCartByUser?serchCon=${inputValue.value}`,
  }).then((res) => {
    if (res.data.code === 200) {
      cardData.value = res.data.data;
    }
  });
});
</script>

<style lang="less" scoped>
.nowenzhang {
  background: #fff;
  width: 500px;
  height: 280px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 65px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background: -webkit-linear-gradient(
      left,
      blue,
      #66ffff 10%,
      #cc00ff 20%,
      #cc00cc 30%,
      #ccccff 40%,
      #00ffff 50%,
      #ccccff 60%,
      #cc00cc 70%,
      #cc00ff 80%,
      #66ffff 90%,
      blue 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: masked-animation 4s linear infinite;
  }
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
