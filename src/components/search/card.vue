<template>
  <div class="card">
    <img :src="'data:' + img[0]" />
    <div style="margin-top: 10px">{{ props.item.title }}</div>
    <div class="botton">
      <div>观看：{{ props.item.show }}</div>
      <div>
        发布时间：{{ getTime(new Date(props.item.time), "yyyy-mm-dd") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ item: Object });
const img = computed(() => {
  let a = props.item.img.split("data:").slice(1, 2);
  return a;
});
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
</script>

<style scoped lang="less">
.card {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  img {
    height: 130px;
    border-radius: 4px;
    width: 100%;
  }
  .botton {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-top: 4px;
    font-size: 12px;
    color: #9499a0;
  }
}
</style>
