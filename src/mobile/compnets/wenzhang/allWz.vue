<template>
  <div>
    <div v-for="item in weizhangs" :key="item.id">
      <div>
        <div>{{ item.title }}</div>
        <div>{{ item.time.slice(0, 10) }}</div>
      </div>
      <div>{{ item.introduction }}</div>
      <img
        :src="itemImg"
        v-for="(itemImg, index) in JSON.parse(item.img)"
        :key="index"
      />
      <div>
        <div>
          <div
            v-for="(biaoqianItem, index) in item.biaoqian.split('；')"
            :key="index"
          >
            {{ biaoqianItem }}
          </div>
        </div>
        <div>
          <div><i class="iconfont icon-chakan" />{{ item.show }}</div>
          <div><i class="iconfont icon-dianzan_kuai" />{{ dianzan }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const weizhangs = ref();
onMounted(async () => {
  await axios({
    method: "GET",
    url: "./wenzi/getCart",
  }).then((res) => {
    weizhangs.value = res.data.data.reverse();
  });
});
</script>

<style></style>
