<template>
  <div>
    <!-- <el-checkbox :model-value="false" label="Option 1" size="large" />
    <div class="dropUpload" ref="dropUpload">
      <el-table :data="tableData" style="width: 100%; height: 100%">
        <el-table-column prop="name" label="文件/文件夹" />
        <el-table-column prop="size" label="大小" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="text" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->

    <virtual-list :data="tableData" :variable="true" :size="100" :remain="4">
      <template #default="{ item }">
        <item-box :item="item"></item-box>
      </template>
    </virtual-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VirtualList from "./components/virtual-list.vue";
import ItemBox from "./components/item-box.vue";
import Mock from "mockjs";
let tableData = ref<any[]>([]);

for (let i = 0; i < 1000; i++) {
  tableData.value.push({ id: i, value: Mock.Random.sentence(0, 100) });
}

// tableData.value = new Array(10000)
//   .fill(null)
//   .map((_, index) => ({ id: index, value: `${index}` }));
// const dropUpload = ref<HTMLElement>();

// const handleDrop = (e: DragEvent) => {
//   e.preventDefault();
//   e.stopPropagation();
//   const files = [];
//   const promises: any[] = [];
//   console.log(e.dataTransfer);
//   for (const item of e.dataTransfer!.items) {
//     const entry: any = item.webkitGetAsEntry();
//     console.log("[ entry ] >", entry);
//     promises.push(readFiles(entry));
//   }
// };
// const readFiles = async (entry: any) => {
//   if (entry.isFile) {
//     const file = await new Promise((resolve, reject) => {
//       entry.file(resolve);
//     });
//     return [file];
//   } else if (entry.isDirectory) {
//     const directoryReader = entry.createReader();

//     const entries: any[] = await new Promise((resolve, reject) => {
//       directoryReader.readEntries(resolve, reject);
//     });

//     let files: any = [];
//     for (const entry of entries) {
//       const resultFiles: any = await readFiles(entry);
//       files = files.concat(resultFiles);
//     }
//     console.log(files);

//     return files;
//   }
// };

// const handleDrag = (e: DragEvent) => {
//   e.preventDefault();
//   e.stopPropagation();
// };
// const handleClick = () => {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.setAttribute("webkitdirectory", "webkitdirectory");
//   input.setAttribute("directory", "directory");
//   input.click();
//   input.onchange = () => {
//     console.log(input.files);
//   };
// };
// onMounted(() => {
//   dropUpload.value!.addEventListener("drop", handleDrop);
//   dropUpload.value!.addEventListener("dragenter", handleDrag);
//   dropUpload.value!.addEventListener("dragleave", handleDrag);
//   dropUpload.value!.addEventListener("dragover", handleDrag);
//   dropUpload.value!.addEventListener("click", handleClick);
// });
</script>

<style>
.dropUpload {
  width: 100%;
  height: 300px;
  border: 1px dashed #ccc;
  padding: 5px 5px;
  box-sizing: border-box;
}
</style>
