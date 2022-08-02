<template>
  <div class="bar">
    <ul class="bar-right">
      <li class="Navigation">
        导航 <i class="iconfont icon-xiangxia" />
        <ul class="NavigationList">
          <li @click="router.push({ path: '/' })">首页</li>
          <li @click="randwanzhang">随机文章</li>
          <li @click="newwanzhang">最新文章</li>
        </ul>
      </li>
      <li class="classification">
        分类 <i class="iconfont icon-xiangxia" />
        <ul class="classificationList">
          <li @click="classificationList('技术')">技术</li>
          <li @click="classificationList('游戏')">游戏</li>
          <li @click="classificationList('动漫')">动漫</li>
          <li @click="classificationList('鬼畜')">鬼畜</li>
        </ul>
      </li>
      <li @click="liuyanclick">留言板</li>
      <li style="margin-right: 50px" class="gzMe">
        关注我<i class="iconfont icon-xiangxia" />
        <ul class="gzMeList">
          <a
            href="https://space.bilibili.com/293942714?spm_id_from=333.337.0.0"
            target="_blank"
            >bilibili</a
          >
          <a href="http://localhost:8080/erweima.jpg" target="_blank"
            >微信公众号</a
          >
          <a href="https://jq.qq.com/?_wv=1027&k=riIqjIjI" target="_blank"
            >QQ群</a
          >
        </ul>
      </li>
      <div class="saosuo" v-if="hasSearch">
        <i
          class="iconfont icon-sousuo"
          @click="showInput"
          :style="{
            left: isshow ? 'calc(100% - 30px)' : '0',
            color: isshow ? '#4c78fc' : '#fff',
          }"
        />
        <div class="input" :style="{ display: isshow ? 'flex' : 'none' }">
          <input
            type="text"
            ref="input"
            v-model="keyword"
            @blur="isshow = false"
            @keydown="keydown"
          />
        </div>
      </div>
    </ul>
    <div class="bar-left">
      <i
        class="iconfont icon-dawutian2"
        v-if="tianqi?.indexOf('雾') !== -1"
      ></i>
      <i
        class="iconfont icon-icon-leizhenyu3"
        v-else-if="tianqi?.indexOf('雷') !== -1"
      ></i>
      <i
        class="iconfont icon-duoyunyoufeng"
        v-else-if="tianqi?.indexOf('云') !== -1"
      ></i>
      <i
        class="iconfont icon-xiayu"
        v-else-if="tianqi?.indexOf('雨') !== -1 && tianqi?.indexOf('雷') === -1"
      ></i>
      <i
        class="iconfont icon-xiaxue"
        v-else-if="tianqi?.indexOf('雪') !== -1"
      ></i>
      <i
        class="iconfonticon-yintian"
        v-else-if="tianqi?.indexOf('阴') !== -1"
      ></i>
      <i class="iconfont icon-taiyang" v-else></i>
      {{ time }}
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const router = useRouter();
const route = useRoute();
const city = ref();
const Weak = ref([]);
const time = ref();
const isshow = ref(false);
const input = ref();
const keyword = ref();
const tianqi = ref();
const hasSearch = ref(true);
const scrollevent = () => {
  if (document.documentElement.scrollTop > 20) {
    document.querySelector(".bar").style.background = "#66ccff";
    document.querySelector(".bar").style.borderBottom = "1px #e8eaed solid";
  } else {
    document.querySelector(".bar").style.background = "rgba(0, 0, 0, 0.3)";
    document.querySelector(".bar").style.borderBottom = "0px";
    ("rgba(255, 255, 255, 0.7)");
  }
};
watch(
  () => route,
  (n) => {
    if (n.path.indexOf("/search") !== -1) {
      hasSearch.value = false;
    } else {
      hasSearch.value = true;
    }
  },
  { deep: true }
);
const showInput = () => {
  isshow.value = true;
  setTimeout(() => {
    input.value.focus();
  }, 300);
};
const liuyanclick = () => {
  router.push({ path: `/message` });
};
const keydown = (e) => {
  if (e.code === "Enter") {
    router.push({ path: `/search/${keyword.value}` });
  }
};
const newwanzhang = async () => {
  let id;
  await axios({
    method: "GET",
    url: `http://localhost:3000/wenzi/getnewwenzahngconcetByUser`,
  }).then((res) => {
    id = res.data.data;
  });
  if (!id) {
    alert("还没有文章哦");
    return;
  }
  router.push({ path: `/article/${id}` });
};
const randwanzhang = async () => {
  let id;
  await axios({
    method: "GET",
    url: `http://localhost:3000/wenzi/getrandwenzahngconcetByUser`,
  }).then((res) => {
    id = res.data.data;
  });
  if (!id) {
    alert("还没有文章哦");
    return;
  }
  router.push({ path: `/article/${id}` });
};
const classificationList = (type) => {
  router.push({ path: `/classification/${type}` });
};
onBeforeMount(async () => {
  Weak.value = [];
  window.addEventListener("scroll", scrollevent);
  await axios({
    method: "GET",
    url: `https://v0.yiketianqi.com/free/day?appid=87273197&appsecret=ZdbOGg77&vue=1&unescape=1`,
  }).then((res) => {
    tianqi.value = res.data.wea;
  });
  setInterval(() => {
    const HH =
      new Date().getHours() < 10
        ? "0" + new Date().getHours()
        : new Date().getHours();
    const mm =
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes();
    const ss =
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds();
    time.value = HH + ":" + mm + ":" + ss;
  }, 1000);
});
</script>

<style lang="less" scoped>
.bar {
  position: fixed;
  align-items: center;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
  height: 60px;
  z-index: 1000;
}
.bar-left {
  margin-right: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 30px;
    font-weight: 400;
    margin-right: 8px;
    color: #4c78fc;
  }
}
.bar-right {
  display: flex;
  height: 100%;
  > li {
    color: #fff;
    margin-left: 20px;
    height: 100%;
    cursor: pointer;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 60px;
    padding: 0 5px;
    margin-top: 2px;
    border-radius: 4px;
    .icon-xiangxia {
      transform: rotateZ(0deg);
      transition: transform 300ms;
    }
    &:first-child {
      margin-left: 40px;
    }
  }
  .icon-sousuo {
    cursor: pointer;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
  }
  > li:hover {
    background-color: #fff;
    color: #4c78fc;
    .icon-xiangxia {
      display: inline-block;
      transform: rotateZ(-180deg);
      transition: transform 300ms;
    }
  }
  .Navigation:hover {
    .NavigationList {
      height: 120px;
      transition: height 300ms;
    }
  }
}
.Navigation {
  position: relative;
  .NavigationList {
    position: absolute;
    top: 60px;
    left: 0;
    height: 0;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    color: #000;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 84px;
    transition: height 300ms;
    > li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 400;

      line-height: 20px;
      &:last-child {
        border-bottom: none;
      }
    }
    & > li:hover {
      background-color: #4c78fc;
      color: #fff;
    }
  }
}

.classification:hover {
  .classificationList {
    height: 160px;
    transition: height 300ms;
  }
}

.classification {
  position: relative;
  .classificationList {
    position: absolute;
    top: 60px;
    left: 0;
    height: 0;
    overflow: hidden;
    background-color: rgba(255, 255, 255);
    color: #000;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 84px;
    transition: height 300ms;
    > li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 400;

      line-height: 20px;
      &:last-child {
        border-bottom: none;
      }
    }
    & > li:hover {
      background-color: #4c78fc;
      color: #fff;
    }
  }
}
.gzMe:hover {
  .gzMeList {
    height: 120px;
    transition: height 300ms;
  }
}
.gzMe {
  position: relative;
  .gzMeList {
    position: absolute;
    top: 60px;
    left: 0;
    height: 0;
    overflow: hidden;
    background-color: rgba(255, 255, 255);
    color: #000;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 110px;
    transition: height 300ms;
    > a {
      display: block;
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 400;
      color: #000;
      text-decoration: none;

      line-height: 20px;
      &:last-child {
        border-bottom: none;
      }
    }
    & > a:hover {
      background-color: #4c78fc;
      color: #fff;
    }
  }
}
.saosuo {
  display: flex;
  align-items: center;
  position: relative;
  .input {
    display: none;
    input {
      border: 0;
      height: 25px;
      border-radius: 4px;
      outline: none;
    }
  }
  i {
    position: absolute;
  }
}
</style>
