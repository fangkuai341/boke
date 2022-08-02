<template>
  <div class="allcard">
    <card v-for="item in props.cardData" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import card from "@/components/search/card.vue";
const props = defineProps({ cardData: Array });
</script>

<style scoped lang="less">
.allcard {
  margin-top: 12px;
  display: grid;
  grid-column-gap: 24px;
  -moz-column-gap: 24px;
  column-gap: 24px;
  grid-row-gap: 24px;
  row-gap: 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 0 25px;
}
</style>
