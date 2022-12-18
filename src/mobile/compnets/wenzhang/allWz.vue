<template>
  <div
    style="height: 100%; overflow: scroll; border-radius: 12px 12px 0px 0px"
    id="scrollElement"
  >
    <div class="allWz">
      <div v-for="item in weizhangs" :key="item.id" class="Wz">
        <div class="title">
          <div>{{ item.title }}</div>
          <div>{{ item.time.slice(0, 10) }}</div>
        </div>
        <div class="introduction">{{ item.introduction }}</div>
        <img
          :src="itemImg"
          v-for="(itemImg, index) in JSON.parse(item.img)"
          :key="index"
          style="margin: 10px auto 0; width: 100%; max-height: 150px"
        />
        <div class="bottom">
          <div>
            <div
              v-for="(biaoqianItem, index) in item.biaoqian.split('；')"
              :key="index"
              class="biaoqian"
            >
              {{ biaoqianItem }}
            </div>
          </div>
          <div>
            <div style="margin-right: 8px; display: flex; align-items: center">
              <i class="iconfont icon-chakan" />{{ item.show }}
            </div>
            <div style="display: flex; align-items: center">
              <i class="iconfont icon-dianzan_kuai" />{{ item.givethumbs }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const weizhangs = ref();
onMounted(async () => {
  await axios({
    method: "GET",
    url: "./wenzi/getCart",
  }).then((res) => {
    weizhangs.value = res.data.data.reverse();
    console.log(weizhangs.value);
  });
});
</script>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
}
.introduction {
  margin-top: 10px;
  text-align: justify;
  color: #8f959e;
  font-size: 14px;
  font-weight: 400;
}
.allWz {
  position: relative;
  z-index: 10;
}
.Wz {
  margin: 0 auto;
  background: #fff;
  padding: 30px 10px 0;
  border-bottom: 2px #8f959e solid;
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  > div {
    display: flex;
  }
}
.biaoqian {
  color: #666;
  border-radius: 12px;
  margin-right: 10px;
  background-color: #f5f5f5;
  font-size: 14px;
  padding: 4px 10px;
}
.biaoqian:not(:first-child) {
  margin-left: 8px;
}
</style>
