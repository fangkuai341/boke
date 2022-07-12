<template>
  <div class="search">
    <input type="text" v-model="inputValue" />
    <i class="iconfont icon-sousuo" @click="showInput"></i>
    <Allcard />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Allcard from "@/components/search/Allcard.vue";
const route = useRoute();
const inputValue = computed(() => route.params.keyword);
</script>

<style scoped lang="less">
.search {
  margin: 80px auto 0;
  overflow: hidden;
  position: relative;
  input {
    background-color: #fff;
    border: none;
    border-radius: 30px;
    font-family: inherit;
    font-size: inherit;
    height: 30px;
    outline: none;
    padding-inline-end: 44px;
    padding-inline-start: 52px;
    width: 250px;
    margin: 0 auto;
    display: block;
  }
  .icon-sousuo {
    position: absolute;
    left: calc(50% - 155px);
    top: 8px;
  }
}
</style>
