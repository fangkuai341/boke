<template>
  <div>
    <NavBar />
    <div>
      <img src="https://www.dmoe.cc/random.php" class="img" />
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar.vue";
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
<style scoped>
.img {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
}
</style>
