import './assets/scss/base.scss';

import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import {createPinia} from 'pinia';
import 'element-plus/dist/index.css';
import router from "./src/router/index.js";
import {createPersistedState} from "pinia-persistedstate-plugin";


const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
app
    .use(ElementPlus)
    .use(pinia)
    .use(router);

app.mount('#app')

pinia.use(persist);
