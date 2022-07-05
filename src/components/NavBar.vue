<template>
  <div class="bar">
    <ul class="bar-right">
      <li class="Navigation">
        导航 <i class="iconfont icon-xiangxia" />
        <ul class="NavigationList">
          <li>首页</li>
          <li>随机文章</li>
          <li>最新文章</li>
        </ul>
      </li>
      <li class="classification">
        分类 <i class="iconfont icon-xiangxia" />
        <ul class="classificationList">
          <li>技术</li>
          <li>游戏</li>
          <li>动漫</li>
          <li>鬼畜视频</li>
        </ul>
      </li>
      <li>留言板</li>
      <li style="margin-right: 50px">关注我</li>
      <div class="saosuo">
        <i class="iconfont icon-sousuo" />
        <input type="text" />
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
import axios from "axios";
const city = ref();
const Weak = ref([]);
const time = ref();
// const test=(font)=>{
//   return tianqi.value.indexOf(test) !== -1
// }
const tianqi = computed(() => {
  let h = new Date().getHours();
  debugger;
  if (-1 < +h < 6) {
    return Weak.value[1];
  }
  if (5 < +h < 18) {
    return Weak.value[2];
  }
  if (17 < +h < 24) {
    return Weak.value[3];
  }
});
const scrollevent = () => {
  if (document.documentElement.scrollTop > 20) {
    document.querySelector(".bar").style.background = "#66ccff";
    document.querySelector(".bar").style.borderBottom = "1px #e8eaed solid";
  } else {
    document.querySelector(".bar").style.background = "rgba(255, 255, 255,0)";
    document.querySelector(".bar").style.borderBottom = "0px";
    ("rgba(255, 255, 255, 0.7)");
  }
};
onBeforeMount(async () => {
  Weak.value = [];
  window.addEventListener("scroll", scrollevent);
  await axios({
    method: "GET",
    url: "http://localhost:3000/cityjson?ie=utf-8",
  }).then((res) => {
    city.value = JSON.parse(res.data.split("=")[1].slice(0, -1)).cname.split(
      "市"
    )[0];
  });
  await axios({
    method: "GET",
    url: `http://localhost:3000/WeatherApi?city=${city.value}`,
  }).then((res) => {
    //上一天
    let weaks = res.data.split("<weather>")[1].split("<type>");
    for (let i = 0; i < weaks.length; i++) {
      if (weaks[i].indexOf("</type>") !== -1) {
        Weak.value.push(weaks[i].split("</type>")[0]);
      }
    }
    //今天
    weaks = res.data.split("<weather>")[2].split("<type>");
    for (let i = 0; i < weaks.length; i++) {
      if (weaks[i].indexOf("</type>") !== -1) {
        Weak.value.push(weaks[i].split("</type>")[0]);
      }
    }
  });
  console.log(Weak.value);
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
  }
}
.bar-right {
  display: flex;
  height: 40px;

  > li {
    color: #4c78fc;
    margin-left: 20px;
    height: 100%;
    cursor: pointer;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
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
    color: #4c78fc;
    height: 100%;
    cursor: pointer;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 40px;
  }
  > li:hover {
    background-color: #4c78fc;
    color: #fff;
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
    top: 40px;
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
    top: 40px;
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
.saosuo {
  position: relative;
  &:hover {
    i {
      position: absolute;
      position: absolute;
      top: -7px;
      left: calc(100% - 30px);
      transition: left 300ms;
    }
    input {
      width: 200px;
      transition: width 300ms;
    }
  }
  input {
    border: 0;
    width: 0;
    height: 25px;
    border-radius: 4px;
    outline: none;
    transition: width 300ms;
  }
  i {
    left: 0;
    transition: left 300ms;
  }
}
</style>
