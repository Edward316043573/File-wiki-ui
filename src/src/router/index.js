import {createRouter,createWebHistory} from 'vue-router'

// 导入组件
import login from '@/views/login/login.vue'
import layout from "@/views/layout.vue";

// 定义路由关系
const routes = [
    {path:'/', component: layout},
    {path:'/login', component:login}
]

// 创建路由器
const router = createRouter({
    // 路由模式
    history:createWebHistory(),
    // 路由关系
    routes:routes

})

// 导出路由
export default router
