<template>
  <div class="item-box">{{ item.id }} {{ item.value }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{ item: Record<string, any> }>();
console.log(props.item);
</script>
<style scoped>
.item-box {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  border: 1px solid pink;
}
</style>
