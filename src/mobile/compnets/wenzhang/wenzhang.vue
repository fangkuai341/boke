<template>
  <div
    v-for="item in weizhangs.wenzhang"
    :key="item.id"
    @click="goto(item.id)"
    style="padding: 10px 10px; border-bottom: 3px solid #999"
  >
    <div class="title">{{ item.title }}</div>
    <div class="introduction">{{ item.introduction }}</div>

    <div><img :src="getImgSrc(item.id)" style="width: 100%" /></div>
    <div class="bottom">
      <div class="watch"><i class="iconfont icon-chakan" />{{ item.show }}</div>
      <div class="dianzan" @click="clickqvxiaodianzan($event)" v-if="isdianzan">
        <i class="iconfont icon-dianzan_kuai" />{{ item.givethumbs + 1 }}
      </div>
      <div class="dianzan" @click="clickdianzan($event)" v-else>
        <i class="iconfont icon-dianzan" />{{ item.givethumbs }}
      </div>
    </div>
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

<style lang="less" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
}
.watch {
  margin-right: 10px;
}
.title {
  font-family: PingFang SC;
  font-style: normal;
  color: #1f2329;
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
}
.introduction {
  font-size: 16px;
  line-height: 18px;
  margin-top: 8px;
  color: #999;
  margin-bottom: 5px;
}
</style>
