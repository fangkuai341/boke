<template>
  <div class="card">
    <img src="@/assets/logo.png" />
    <div>tit</div>
    <div class="botton">
      <div>观看：{{ 666 }}</div>
      <div>发布时间：{{ 20200912 }}</div>
    </div>
  </div>
</template>

<script>
export default {};
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
  }
}
</style>
