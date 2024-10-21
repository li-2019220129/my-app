import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { setupIcons } from "@/icon";

const app = createApp(App);

app.use(setupIcons);
app.use(ElementPlus);
app.mount("#app");
