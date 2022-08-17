<template>
  <div class="mag">
    <div class="name">{{ props.item.name }}：</div>
    <div class="neirong">
      {{ props.item.liuyancontent }}
    </div>
    <div class="time">{{ props.item.time.split("T")[0] }}</div>
    <div class="myneirong neirong">
      <span class="name">我的回复：</span>{{ props.item.myans }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object });
console.log(props.item);
</script>

<style lang="less" scoped>
.mag {
  margin: 10px auto 0;
  background-color: rgba(255, 255, 255, 0.9);
  width: 120vh;
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
