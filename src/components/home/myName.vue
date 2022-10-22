<template>
  <div style="margin-top: 80px; margin-left: 50px; position: fixed; left: 70%">
    <div class="name">
      <img src="@/assets/images/tx.jpg" />
      <div class="nicheng">方块</div>
      <div>一个喜欢动漫和鬼畜的前端狗</div>
      <div class="jianjie">{{ jianjie }}</div>
    </div>
    <div class="myZhaoHao">
      <div class="tit">我的账号</div>
      <div>B站：洛懿川</div>
      <div>QQ群：173100807</div>
      <div>微信公众号：鬼畜大世界</div>
      <div>github：https://github.com/fangkuai341</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const jianjie = ref("");
onMounted(async () => {
  await axios({
    method: "GET",
    url: "https://saying.api.azwcl.com/saying/get",
  }).then(({ data }) => {
    jianjie.value = data.data.content;
  });
});
</script>

<style lang="less" scoped>
.name {
  width: 300px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  img {
    width: 100px;
    border-radius: 50%;
  }
  > div {
    margin-top: 10px;
  }
  .nicheng {
    font-family: PingFang SC;
    font-style: normal;
    color: #1f2329;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }
  .jianjie {
    font-size: 16px;
    line-height: 18px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    color: #999;
    width: 250px;
    display: flex;
    justify-content: center;
  }
}
.myZhaoHao {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  > div {
    margin-top: 5px;
  }
  .tit {
    display: flex;
    justify-content: center;
    font-family: PingFang SC;
    font-style: normal;
    color: #1f2329;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }
}
</style>
