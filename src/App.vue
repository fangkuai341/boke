<template>
  <div class="updateCurr">
    <div class="bg"></div>
    <NavBar />
    <div class="sssss">冀ICP备2022021189</div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue";
import { onMounted } from "vue";
import { startSakura } from "@/hook/FloDown";
import { useStore } from "./store/index.js";
const store = useStore();

// onMounted(() => {
//   L2Dwidget.init({
//     model: {
//       jsonPath:
//         "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
//     },
//     display: {
//       position: "left",
//       width: 120,
//       height: 200,
//       hOffset: 0,
//       vOffset: 0,
//     },
//     mobile: {
//       show: true,
//       scale: 1,
//     },
//     react: {
//       opacityDefault: 1,
//     },
//   });

//   startSakura();
//   !(function (e, t, a) {
//     function r() {
//       for (var e = 0; e < s.length; e++)
//         s[e].alpha <= 0
//           ? (t.body.removeChild(s[e].el), s.splice(e, 1))
//           : (s[e].y--,
//             (s[e].scale += 0.004),
//             (s[e].alpha -= 0.013),
//             (s[e].el.style.cssText =
//               "left:" +
//               s[e].x +
//               "px;top:" +
//               s[e].y +
//               "px;opacity:" +
//               s[e].alpha +
//               ";transform:scale(" +
//               s[e].scale +
//               "," +
//               s[e].scale +
//               ") rotate(45deg);background:" +
//               s[e].color +
//               ";z-index:99999"));
//       requestAnimationFrame(r);
//     }

//     function n() {
//       var t = "function" == typeof e.onclick && e.onclick;
//       e.onclick = function (e) {
//         t && t(), o(e);
//       };
//     }

//     function o(e) {
//       var a = t.createElement("div");
//       (a.className = "heart"),
//         s.push({
//           el: a,
//           x: e.clientX - 5,
//           y: e.clientY - 5,
//           scale: 1,
//           alpha: 1,
//           color: c(),
//         }),
//         t.body.appendChild(a);
//     }

//     function i(e) {
//       var a = t.createElement("style");
//       a.type = "text/css";
//       try {
//         a.appendChild(t.createTextNode(e));
//       } catch (t) {
//         a.styleSheet.cssText = e;
//       }
//       t.getElementsByTagName("head")[0].appendChild(a);
//     }

//     function c() {
//       return (
//         "rgb(" +
//         ~~(255 * Math.random()) +
//         "," +
//         ~~(255 * Math.random()) +
//         "," +
//         ~~(255 * Math.random()) +
//         ")"
//       );
//     }
//     var s = [];
//     (e.requestAnimationFrame =
//       e.requestAnimationFrame ||
//       e.webkitRequestAnimationFrame ||
//       e.mozRequestAnimationFrame ||
//       e.oRequestAnimationFrame ||
//       e.msRequestAnimationFrame ||
//       function (e) {
//         setTimeout(e, 1e3 / 60);
//       }),
//       i(
//         ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
//       ),
//       n(),
//       r();
//   })(window, document);
// });
//
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
.updateCurr {
  cursor: url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur),
    auto;
}
.bg {
  background: url("@/assets/images/bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  z-index: -1;
}
.sssss {
  width: 160px;
  position: fixed;
  top: 100%;
  left: 100%;
  transform: translateX(-100%) translateY(-100%);
}
</style>
