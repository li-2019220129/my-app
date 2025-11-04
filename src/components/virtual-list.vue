<template>
  <div class="virtual-box" ref="boxRef" @scroll="handleScroll">
    <div class="scrollbar" ref="scrollRef"></div>
    <div class="virtual-list" ref="listRef">
      <div
        ref="itemRef"
        v-for="item in virtualData"
        :key="item.id"
        :vid="item.id"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, computed, onUpdated, nextTick } from "vue";

const props = defineProps({
  size: {
    type: Number,
    default: 40,
  },
  remain: {
    type: Number,
    default: 8,
  },
  data: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  variable: {
    type: Boolean,
    default: false,
  },
});
const state = ref({
  start: 0,
  end: props.remain,
});

const boxRef = ref<HTMLElement>();
const scrollRef = ref<HTMLElement>();
const listRef = ref<HTMLElement>();
const itemRef = ref<HTMLElement[]>();
const cacheList = ref<Array<any>>();

onMounted(() => {
  boxRef.value!.style.height = `${props.size * props.remain}px`;
  scrollRef.value!.style.height = `${props.data.length * props.size}px`;
  cacheList.value = props.data.map((item, index) => {
    return {
      height: props.size,
      top: index * props.size,
      bottom: index * props.size + props.size,
    };
  });
});

const next = computed(() => {
  return Math.min(props.remain, props.data.length - state.value.end);
});

const pre = computed(() => {
  return Math.min(props.remain, state.value.start);
});
const virtualData = computed(() => {
  return props.data.slice(
    state.value.start - pre.value,
    state.value.end + next.value
  );
});

const findStart = (val: number) => {
  let start = 0;
  let end = props.data.length - 1;
  let temp = 0;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    const midValue = cacheList.value![mid].bottom;
    if (midValue > val) {
      if (!temp || temp > mid) {
        temp = mid;
      }
      end = mid - 1;
    } else if (midValue < val) {
      start = mid + 1;
    } else {
      return mid + 1;
    }
  }
  return temp;
};
onUpdated(() => {
  nextTick(() => {
    const node = itemRef.value;
    if (!node || !node.length) return;
    node.forEach((item, index) => {
      const { height } = item.getBoundingClientRect();
      const count = Number(item.getAttribute("vid"));
      const val = cacheList.value![count].height - height;
      if (val) {
        cacheList.value![count].height = height;
        cacheList.value![count].bottom = cacheList.value![count].bottom - val;
        for (let i = count + 1; i < cacheList.value!.length; i++) {
          cacheList.value![i].top = cacheList.value![i - 1].bottom;
          cacheList.value![i].bottom = cacheList.value![i].bottom - val;
        }
      }
    });
    scrollRef.value!.style.height = `${
      cacheList.value![cacheList.value!.length - 1].bottom
    }px`;
  });
});
const handleScroll = () => {
  const scrollTop = boxRef.value!.scrollTop;
  if (props.variable) {
    state.value.start = findStart(scrollTop);
    state.value.end = state.value.start + props.remain;
    listRef.value!.style.transform = `translateY(${
      cacheList.value![state.value.start - pre.value].top
    }px)`;
    console.log(state.value);
  } else {
    state.value.start = Math.floor(scrollTop / props.size);
    state.value.end = state.value.start + props.remain;
    listRef.value!.style.transform = `translateY(${
      state.value.start * props.size - pre.value * props.size
    }px)`;
    console.log(state.value);
  }
};
</script>
<style scoped>
.virtual-box {
  position: relative;
  overflow-y: scroll;
  border: 1px solid #ccc;
}
.virtual-list {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
</style>
