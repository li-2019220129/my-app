<template>
  <TableComponent :data="tableData" :col="colData"></TableComponent>
</template>

<script setup lang="tsx">
import { reactive, ref, onMounted, watch, nextTick } from "vue";
import TableComponent from "./components/table-component.tsx";

const poperMap = ref({});
const checkMap = async () => {
  const domArr = document.querySelectorAll(".cell-box");
  domArr.forEach((el: any) => {
    const id = el.getAttribute("data-value");
    poperMap.value[id] = el.scrollWidth > el.clientWidth;
  });
};
const tableData = ref<any[]>([]);

watch(
  () => tableData.value,
  async () => {
    await nextTick();
    checkMap();
  },
  { deep: true }
);
const colData = reactive([
  {
    type: "selection",
    width: "55",
    showOverflowTooltip: true,
  },
  {
    minWidth: "120",
    property: "name",
    label: "名称",
    sortable: true,
    slot: {
      default: (props: any) => {
        return (
          <el-tooltip
            disabled={!poperMap.value[props.row.id]}
            class="box-item"
            effect="light"
            content={props.row.name}
            placement="top-start"
          >
            <div class="elips cell-box" data-value={props.row.id}>{props.row.name}</div>
          </el-tooltip>
        );
      },
      header: () => {
        console.log("slot header");
      },
    },
  },
  {
    minWidth: "120",
    property: "age",
    label: "年龄",
    showOverflowTooltip: true,
    sortable: true,
    fixed: "left",
    slot: {
      default: () => {
        return <div>21212s</div>;
      },
      header: () => {
        console.log("slot header");
      },
    },
  },
  {
    width: "120",
    property: "address",
    label: "地址",
    showOverflowTooltip: true,
    slot: {
      default: () => {
        console.log("slot");
      },
      header: () => {
        console.log("slot header");
      },
    },
  },
]);



onMounted(() => {
  window.addEventListener("resize", checkMap);
  setTimeout(() => {
    tableData.value = [
      {
        id: 1,
        name: "王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎",
        age: 18,
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        id: 2,
        name: "王小虎",
        age: 18,
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        id: 3,
        name: "王小虎",
        age: 18,
        address: "上海市普陀区金沙江路 1518 弄",
      },
    ]
  }, 1000);
});
</script>
<style scoped>
:deep(.elips) {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
