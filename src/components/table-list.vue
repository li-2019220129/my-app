<template>
  <div class="item-box">
    <div class="left">
      <span>{{ item.tips }}</span>
    </div>
    <div class="right">
      <span v-if="!item.edit" @click="handleEditClick(item, true)"
        >{{ item.name }}
      </span>
      <el-input
        v-else
        v-model="changeComputed"
        style="width: 100%"
        autosize
        @blur="handleEditClick(item, false)"
        type="textarea"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed } from "vue";
const props = defineProps({
  item: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
});
const emit = defineEmits(["editClick", "editNameClick"]);

const changeComputed = computed({
  get() {
    return props.item.name;
  },
  set(newValue) {
    emit("editNameClick", props.item.id, newValue);
  },
});
const handleEditClick = (item: any, type: boolean) => {
  emit("editClick", item.id, type);
};
</script>
<style scoped>
.item-box {
  width: 100%;
  min-height: 60px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  .left {
    width: 100px;
    min-height: 60px;
    border-right: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #191919;
  }
  .right {
    padding: 10px;
    box-sizing: border-box;
    flex: 1;
    height: 100%;
  }
}
</style>
