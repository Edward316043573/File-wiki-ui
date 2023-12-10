import './assets/scss/base.scss';

import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import {createPinia} from 'pinia';
import 'element-plus/dist/index.css';
import router from "./router/index.js";
import {createPersistedState} from "pinia-persistedstate-plugin";
import Antd from 'ant-design-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Vant from 'vant'


const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
app
    .use(ElementPlus, {local: zhCn})
    .use(pinia)
    .use(Vant)
    .use(Antd)
    .use(router);

app.mount('#app')

pinia.use(persist);

app.config.globalProperties.$hasPermission = function (permissionList, permissionCode) {
    let code = permissionList.find((item) => {
        return item === permissionCode;
    });
    return !!code
}
