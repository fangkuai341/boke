<template>
  <div>
    <NavBar />
    <div>
      <img
        src="https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/"
        class="img"
      />
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue";
import { onMounted } from "vue";
onMounted(() => {
  L2Dwidget.init({
    model: {
      jsonPath:
        "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
    },
    display: {
      position: "left",
      width: 120,
      height: 200,
      hOffset: 0,
      vOffset: 0,
    },
    mobile: {
      show: true,
      scale: 1,
    },
    react: {
      opacityDefault: 1,
    },
  });
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
</style>
<style lang="less" scoped>
.img {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
}
</style>
