<template>
  <div v-for="item in allmsg" :key="item.id" class="liuyan">
    <div class="mag">
      <div class="name">{{ item.name }}：</div>
      <div class="neirong">
        {{ item.liuyancontent }}
      </div>
      <div class="time">{{ item.time.split("T")[0] }}</div>
      <div class="myneirong neirong">
        <span class="name">我的回复：</span>{{ item.myans }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const allmsg = ref();
onMounted(() => {
  getMsg();
});
const getMsg = async () => {
  let data = await axios({
    method: "GET",
    url: "./getmsg/getMsg",
  });
  allmsg.value = data.data.data.reverse();
  //   .then((res) => {
  //     allmsg.value = res.data.data.reverse();
  //   });
};
</script>

<style lang="less" scoped>
.liuyan {
  border-bottom: 2px solid #000;
}
.mag {
  margin: 10px auto 0;
  background-color: rgba(240, 205, 205, 90%);

  padding: 10px 20px;
  border-radius: 4px;
  div {
    margin-top: 10px;
  }
  .name {
    font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
      sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #61666d;
  }
  .neirong {
    font-size: 16px;
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
      sans-serif;
    font-weight: 400;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  .time {
    font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei,
      sans-serif;
    font-weight: 400;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 12px;
    color: #61666d;
    text-align: end;
  }
}
</style>
