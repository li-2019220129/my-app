import { createApp } from "vue";
import App from "./App.vue";
import TableApp from "./TableApp.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "../styles/index.css";
import { setupIcons } from "@/icon";

const app = createApp(TableApp);

app.use(setupIcons);
app.use(ElementPlus);
app.mount("#app");
