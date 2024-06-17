import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/router.js";
import {createPinia} from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
let app = createApp(App);
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app');
