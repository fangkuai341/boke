<template>
  <div class="wenzi" @click="wenzhangtiaozhaung(wenzhang.id)">
    <div class="titandtime">
      <div class="tit">{{ wenzhang.title }}</div>
      <div>{{ wenzhang.time.slice(0, 10) }}</div>
    </div>
    <div class="dates">{{ wenzhang.introduction }}</div>
    <div class="img">
      <img
        v-for="(item, index) in img"
        :src="item"
        :key="index"
        style="height: 200px; width: 100%"
      />
    </div>
    <div class="bottom">
      <div>
        <div class="biaozhi" v-for="(item, index) in biaoqians" :key="index">
          {{ item }}
        </div>
      </div>
      <div>
        <div class="watch">
          <i class="iconfont icon-chakan" />{{ wenzhang.show }}
        </div>
        <div
          class="dianzan"
          @click="clickqvxiaodianzan($event)"
          v-if="isdianzan"
        >
          <i class="iconfont icon-dianzan_kuai" />{{ dianzan }}
        </div>
        <div class="dianzan" @click="clickdianzan($event)" v-else>
          <i class="iconfont icon-dianzan" />{{ dianzan }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "../../store/index.js";
const store = useStore();
const emits = defineEmits(["login"]);
const props = defineProps({ item: Object });
const wenzhang = props.item;
const dianzan = ref(props.item.givethumbs);
const isdianzan = ref(false);
const router = useRouter();
const Upwemzis = ref();
const biaoqians = computed(() => {
  let a = wenzhang.biaoqian.split("；");
  return a;
});
const img = computed(() => {
  let a;
  if (wenzhang.img) {
    a = JSON.parse(wenzhang.img);
  } else {
    a = [];
  }
  return a;
});
const clickdianzan = async (event) => {
  //取消冒泡
  event.cancelBubble = true;
  await axios({
    method: "POST",
    url: "http://116.204.65.53/dianzan/isDz",
    data: {
      id: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))[0].id
        : "",
    },
  }).then((res) => {
    if (res.data.code === -200) {
      emits("login");
    }
    if (res.data.code === 200) {
      dianzan.value++;
      isdianzan.value = true;
      let a = store.Upwemzis;
      a.push(wenzhang.id);
      store.Upwemzis = a;
      serverDianzan();
    }
  });
};
const clickqvxiaodianzan = (event) => {
  event.cancelBubble = true;
  dianzan.value--;
  isdianzan.value = false;
  let a = store.Upwemzis;
  a.splice(a.indexOf(wenzhang.id), 1);
  store.Upwemzis = a;
  serverDianzan();
};
const wenzhangtiaozhaung = (id) => {
  router.push({ path: `/article/${id}` });
};
const serverDianzan = async () => {
  await axios({
    method: "POST",
    url: "http://116.204.65.53/dianzan/Dz",
    data: {
      Upwemzis: JSON.stringify(store.Upwemzis),
      userid: JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))[0].id
        : "",
      giveupnum: dianzan.value,
      wenzhangid: wenzhang.id,
    },
  });
};
onMounted(async () => {
  axios.defaults.baseURL = "http://127.0.0.1:8080";
  //请求拦截
  axios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem("token");
    return config;
  });
  //获取用户点赞的文章
  await axios({
    method: "POST",
    url: "http://116.204.65.53/dianzan/isDz",
    data: {
      id: JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))[0].id
        : "",
    },
  }).then((res) => {
    if (res.data.code === 200) {
      Upwemzis.value = JSON.parse(res.data.data[0].Upwemzis);
      store.Upwemzis = Upwemzis.value;
      for (let i = 0; i < Upwemzis.value.length; i++) {
        if (Upwemzis.value[i] === wenzhang.id) {
          isdianzan.value = true;
          return;
        }
      }
    }
  });
});
</script>

<style lang="less" scoped>
.wenzi {
  background: #fff;
  padding: 20px 30px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  &:first-child {
    margin-top: 0;
  }
  .titandtime {
    display: flex;
    justify-content: space-between;
    .tit {
      font-family: PingFang SC;
      font-style: normal;
      color: #1f2329;
      font-size: 18px;
      line-height: 20px;
      font-weight: 600;
    }
  }
  .dates {
    font-size: 16px;
    line-height: 18px;
    margin-top: 8px;
    color: #999;
  }
  .img {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    img:not(:first-child) {
      margin-left: 10px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      display: flex;
      .biaozhi {
        color: #666;
        border-radius: 12px;
        margin-right: 10px;
        background-color: #f5f5f5;
        font-size: 14px;
        padding: 4px 10px;
      }
      .watch,
      .dianzan {
        margin-left: 10px;
        color: #ccc;
        font-size: 14px;
        i {
          color: #b3b3b3;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
