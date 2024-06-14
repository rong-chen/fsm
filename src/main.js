import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/router.js";
import {createPinia} from "pinia";
let app = createApp(App);
app.use(createPinia())
app.use(router)
app.mount('#app');