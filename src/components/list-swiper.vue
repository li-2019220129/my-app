<template>
  <div ref="swiper" class="swiper" :style="{ height: '80px' }">
    <div
      v-if="isShowBtn"
      :class="{ 'swiper-left-btn': true, disabled: !leftShow }"
      @click="handleMove(-1)"
    >
      <div class="icon">
        <el-icon><ArrowLeftBold /></el-icon>
      </div>
    </div>
    <div class="swiper-box" ref="swiperBoxRef">
      <div class="swiper-content" ref="swiperContentRef">
        <div class="swiper-list" v-for="item in swiper" :key="item.id">
          <div class="text">
            <span class="num">{{ item.source }}</span>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowBtn"
      :class="{ 'swiper-right-btn': true, disabled: !rightShow }"
      @click="handleMove(1)"
    >
      <div class="icon">
        <el-icon><ArrowRightBold /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowRightBold, ArrowLeftBold } from "@element-plus/icons-vue";
import { PropType, computed, ref } from "vue";
const props = defineProps({
  listItem: {
    type: Array as PropType<Array<Record<string, any>>>,
    default: () => [],
  },
});
const swiperBoxRef = ref<HTMLElement>();
const swiperContentRef = ref<HTMLElement>();
const swiper = computed(() => props.listItem);
const count = ref(0);

const isShowBtn = computed(() => {
  if (!swiperContentRef.value || !swiperBoxRef.value) return false;
  return swiperContentRef.value!.scrollWidth > swiperBoxRef.value!.offsetWidth;
});
const rightShow = computed(() => {
  if (!swiperContentRef.value || !swiperBoxRef.value) return false;
  return (
    swiperContentRef.value!.scrollWidth >
    swiperBoxRef.value!.offsetWidth + count.value * 252
  );
});
const leftShow = computed(() => {
  return count.value > 0;
});
const handleMove = (num: number) => {
  if (num < 0 && !leftShow.value) return;
  if (num > 0 && !rightShow.value) return;
  count.value += num;
  swiperContentRef.value!.style.transform = `translateX(${
    -count.value * 252
  }px)`;
};
</script>
<style scoped>
.swiper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.swiper-left-btn {
  cursor: pointer;
  width: 40px;
  height: 100%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-right-btn {
  cursor: pointer;
  width: 40px;
  height: 100%;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.disabled {
  opacity: 0.2;
}
.swiper-box {
  width: calc(100% - 80px - 16px);
  height: 100%;
  overflow: hidden;
}
.swiper-content {
  display: flex;
  align-items: center;
  transition: 0.5s;
}
.swiper-list {
  flex-shrink: 0;
  width: 252px;
  height: 76px;
  border-radius: 8px;
  margin-right: 8px;
  padding: 16px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #e1e8fd;
}
.text {
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.num {
  width: 33px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  padding: 0px 8px 0px 8px;
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #c9c9c9;
}
</style>
