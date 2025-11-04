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

    <!-- <virtual-list :data="tableData" :variable="true" :size="100" :remain="4">
      <template #default="{ item }">
        <item-box :item="item"></item-box>
      </template>
    </virtual-list>
    <el-input
      v-model="input"
      style="width: 240px"
      :suffix-icon="Calendar"
      clearable
      show-password
      placeholder="Please input password"
    /> -->

    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180">
        <template #default="{ row, column, $index }">
          <div @click.stop="handleClick(row, column, $index)" class="edit">
            <span v-if="!row[`${column.getColumnIndex()}${$index}`]">{{
              row.date
            }}</span>
            <el-input v-model="row.date" v-else size="mini" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180">
        <template #default="{ row, column, $index }">
          <div @click.stop="handleClick(row, column, $index)" class="edit">
            <span v-if="!row[`${column.getColumnIndex()}${$index}`]">{{
              row.name
            }}</span>
            <el-input v-model="row.name" v-else size="mini" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="Address" />
    </el-table> -->

    <!-- <el-drawer
      :close-on-click-modal="false"
      size="50%"
      ref="elRef"
      v-model="drawer2"
    >
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <div ref="contentRef" class="table-content">
          <table-list
            v-for="(item, index) in tableDataList"
            :key="index"
            :item="item"
            @edit-click="handleditClick"
            @editNameClick="handleEditNameClick"
          ></table-list>
          <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item label="Password" prop="info">
              <el-input v-model="ruleForm.info.ip" />
              <el-select
                v-model="ruleForm.info.name"
                placeholder="Select"
                size="small"
                clearable
                style="width: 100%; margin-top: 10px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
         
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Submit
              </el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
         <list-swiper :listItem="listItem"></list-swiper> 
      </template>
    </el-drawer> -->
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  nextTick,
  reactive,
  onUnmounted,
  useTemplateRef,
  handleError,
  watch,
} from "vue";
import VirtualList from "./components/virtual-list.vue";
import ItemBox from "./components/item-box.vue";
import { Calendar } from "@element-plus/icons-vue";
import Mock from "mockjs";
import TableList from "./components/table-list.vue";
import ListSwiper from "./components/list-swiper.vue";
// const options = [
//   {
//     value: "Option1",
//     label: "Option1",
//   },
//   {
//     value: "Option2",
//     label: "Option2",
//   },
//   {
//     value: "Option3",
//     label: "Option3",
//   },
//   {
//     value: "Option4",
//     label: "Option4",
//   },
//   {
//     value: "Option5",
//     label: "Option5",
//   },
// ];
// const drawer2 = ref(true);
// const contentRef = useTemplateRef("contentRef");
// const elRef = useTemplateRef("elRef");
// const tableDataList = ref([
//   {
//     id: "0",
//     tips: "解决方案",
//     edit: false,
//     name: `时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后,
//     时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后,时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后
//     时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后,时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后
//     时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后,时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后
//     时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后,时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后`,
//   },
//   {
//     id: "1",
//     edit: false,
//     tips: "解决方案",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就是大的",
//   },
// ]);
// const listItem = ref([
//   {
//     id: "0",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈发放滑石粉哈佛杀害符号i回到好还杀害哈后",
//     source: 7.7,
//   },
//   {
//     id: "1",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就是大的",
//     source: 7.7,
//   },
//   {
//     id: "2",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就",
//     source: 7.7,
//   },
//   {
//     id: "3",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就",
//     source: 7.7,
//   },
//   {
//     id: "4",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就",
//     source: 7.7,
//   },
//   {
//     id: "5",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就哈哈哈·哈啊带·阿九阿九",
//     source: 7.7,
//   },
//   {
//     id: "6",
//     name: "时候上看看含税售价是爱啥叫撒卡卡还撒娇萨拉就",
//     source: 7.7,
//   },
// ]);

// const handleEditNameClick = (id: string, name: string) => {
//   const data = tableDataList.value.find((item) => item.id === id);
//   data!.name = name;
// };
// const handleditClick = (id: string, editType: boolean) => {
//   const data = tableDataList.value.find((item) => item.id === id);
//   data!.edit = editType;
// };

// import type { FormInstance, FormRules } from "element-plus";

// const ruleFormRef = ref<FormInstance>();

// const validatePass = (rule: any, value: any, callback: any) => {
//   console.log("121212");

//   if (!value.ip && !value.name) {
//     callback(new Error("Please input digits"));
//   } else {
//     // if (ruleForm.checkPass !== "") {
//     //   if (!ruleFormRef.value) return;
//     //   ruleFormRef.value.validateField("checkPass");
//     // }
//     callback();
//   }
// };

// const ruleForm = reactive({
//   info: {
//     ip: "",
//     name: "",
//   },
// });

// const rules = reactive<FormRules<typeof ruleForm>>({
//   info: [{ validator: validatePass, trigger: "change" }],
// });

// const submitForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.validate((valid) => {
//     if (valid) {
//       console.log("submit!");
//     } else {
//       console.log("error submit!");
//     }
//   });
// };

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };
// let tableData = ref<any[]>([]);
// const input = ref("");
// for (let i = 0; i < 1000; i++) {
//   tableData.value.push({ id: i, value: Mock.Random.sentence(0, 100) });
// }

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

// const editElm = ref();
// const rowValue = ref();
// onMounted(() => {
//   window.addEventListener("click", handleWindowClick);
//   drawer2.value = true;
// });

// onUnmounted(() => {
//   window.removeEventListener("click", handleWindowClick);
// });
// const tableData = [
//   {
//     date: "2016-05-03",
//     name: "Tom",
//     edit: false,
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-02",
//     name: "adn",
//     edit: false,
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-04",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-01",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
// ];

// const handleWindowClick = (e: Event) => {
//   if (!editElm.value?.contains(e.target as Node)) {
//     rowValue.value &&
//       (rowValue.value[
//         `${rowValue.value.columnIndex}${rowValue.value.rowIndex}`
//       ] = false);
//   }
//   console.log(tableData);
// };

// const handleClick = (
//   row: Record<string, any>,
//   column: Record<string, any>,
//   index: number
// ) => {
//   console.log(row, column.getColumnIndex(), index);
//   rowValue.value &&
//     (rowValue.value[`${rowValue.value.columnIndex}${rowValue.value.rowIndex}`] =
//       false);
//   row[`${column.getColumnIndex()}${index}`] = true;
//   row.columnIndex = column.getColumnIndex();
//   row.rowIndex = index;
//   rowValue.value = row;
//   nextTick(() => {
//     editElm.value = document.querySelector(".edit");
//   });
// };

// const menuValue = ref<HTMLUListElement>();
// const options = {
//   menus: [
//     {
//       name: "往上加一行",
//       onClick: () => {
//         console.log("往上加一行");
//       },
//     },
//     {
//       name: "往下加一行",
//       onClick: () => {
//         console.log("往下加一行");
//       },
//     },
//     {
//       name: "删除这一行",
//       onClick: () => {
//         console.log("删除这一行");
//       },
//     },
//   ],
// };
// const createMenu = () => {
//   const ul = document.createElement("ul");
//   ul.classList.add("custom-context-menu");
//   const { menus } = options;
//   if (menus && menus.length > 0) {
//     for (let menu of menus) {
//       const li = document.createElement("li");
//       li.textContent = menu.name;
//       li.onclick = menu.onClick;
//       ul.appendChild(li);
//     }
//   }
//   const body = document.querySelector("body");
//   body!.appendChild(ul);
//   return ul;
// };

// const showMenu = (e: any) => {
//   console.log(e.clientX, e.clientY);
//   if (!menuValue.value) {
//     menuValue.value = createMenu();
//   }
//   menuValue.value.style.left = `${e.clientX}px`;
//   menuValue.value.style.top = `${e.clientY}px`;
// };

// onMounted(() => {
//   nextTick(() => {
//     console.log((elRef.value as any).$el);

//     const contentDom = document.querySelector(".table-content");
//     document.addEventListener("click", (event) => {
//       if (!contentDom!.contains(event.target as any)) {
//         menuValue.value && menuValue.value.remove();
//         menuValue.value = undefined;
//       }
//     });
//     contentDom!.addEventListener("contextmenu", (e: any) => {
//       e.preventDefault();
//       showMenu(e);
//     });
//     contentDom!.addEventListener("click", (e: any) => {
//       menuValue.value && menuValue.value.remove();
//       menuValue.value = undefined;
//     });
//     (elRef.value as any).$el.nextElementSibling.children[0].addEventListener(
//       "click",
//       (e: any) => {
//         menuValue.value && menuValue.value.remove();
//         menuValue.value = undefined;
//       }
//     );
//   });

// console.log((elRef.value as any).$el.nextElementSibling.children[0]);

// document.addEventListener("contextmenu", () => {
//   menuValue.value && menuValue.value.remove();
//   menuValue.value = undefined;
// });
const val = ref("");
let timer = 3000;
let cb: any | (() => void) = null;
const getData = (timer: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
};
watch(
  () => val.value,
  async (newVal, oldVal) => {
    let flag = true;
    timer -= 1000;
    if (cb) cb();
    cb = () => {
      flag = false;
    };
    let data = await getData(timer);
    if (flag) {
      console.log(data);
    }
  },
  {
    flush: "sync",
  }
);

setTimeout(() => {
  val.value = "a";
  val.value = "b";
}, 1000);
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
