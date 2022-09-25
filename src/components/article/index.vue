<template>
  <div class="allwenzhang">
    <div class="head">
      <div class="tit">{{ wenzhang.title }}</div>
      <div class="smallTit">
        <div>标签：{{ wenzhang.biaoqian }}</div>
        <div>
          时间：{{ getTime(new Date(wenzhang.time), "yyyy-mm-dd HH:MM:SS") }}
        </div>
        <div>观看：{{ wenzhang.show }}</div>
        <div>点赞：{{ wenzhang.givethumbs }}</div>
      </div>
    </div>
    <div v-html="context" style="margin-top: 30px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const wenzhang = ref({});
const context = ref("");
// 时间格式化
const getTime = (dateData, format) => {
  let date;
  try {
    date = new Date(dateData);
  } catch (error) {
    throw new Error("dateFormat 日期初始化出错");
  }
  let fmt = format;
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    if (Object.prototype.hasOwnProperty.call(opt, k)) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
  }
  return fmt;
};
onMounted(async () => {
  await axios({
    method: "POST",
    url: `http://www.dls-lcy.com/wenzi/addshow`,
    data: {
      wenzhangid: route.params.id,
    },
  });
  axios
    .get(
      `http://www.dls-lcy.com/wenzi/getwenzahngconcetByUser?wenzhangId=${route.params.id}`
    )
    .then((res) => {
      wenzhang.value = res.data.data[0];
      context.value = res.data.data[0].content;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style setup lang="less">
.allwenzhang {
  background: rgba(255, 255, 255, 0.9);
  width: 70%;
  margin: 80px auto 0;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  padding: 30px 50px;
  .tit {
    min-height: 39px;
    font-size: 28px;
    color: #222;
    margin-bottom: 16px;
    font-weight: 700;
    line-height: 1.4;
  }
  .smallTit {
    display: flex;
    font-weight: 400;
    font-size: 13px;
    color: #999;
    div {
      margin-right: 30px;
    }
  }
}
</style>
