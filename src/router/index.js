import {createRouter,createWebHistory} from 'vue-router'

// 导入组件
import login from '@/views/login/login.vue'
import layout from "@/components/layouts/index.vue";
// import ShareLayout from '@/views/layout/components/ShareLayout.vue'
// import ShareMobileLayout from '@/views/layout/components/ShareMobileLayout.vue'
//
import Search from '@/views/page/Search.vue'
import NoAuth from '@/views/common/NoAuth.vue'

import Home from '@/views/home/Home.vue'

import Show from '@/views/page/Show.vue'
import Edit from '@/views/page/Edit.vue'
//
import spaceManage from '@/views/space/Manage.vue'
//
// import sharePcHome from '@/views/page/share/pc/Home.vue'
// import sharePcView from '@/views/page/share/pc/View.vue'
// import shareMobileView from '@/views/page/share/mobile/View.vue'

// 用户设置
import setting from '@/views/setting/index.vue'
import userInfo from '@/views/setting/UserInfo.vue'
import MenuSetting from'@/views/setting/menu/index.vue'
import RoleSetting from'@/views/setting/role/index.vue'
import UserSetting from'@/views/setting/user/index.vue'

import onlyOffice from '@/components/onlyoffice/index.vue'


// 定义路由关系
let routes = [
    {path: '/', redirect: '/home'},
    {path: '/page/search', name: 'WIKI-全局搜索', component: Search},
    {path: '/noAuth', name: 'WIKI-没有权限', component: NoAuth},
    {
        path: '/',
        name: '文档管理',
        component: layout,
        children: [
            {path: '/home', name: 'WIKI文档管理', component: Home},
            {path: '/page/show', name: 'WIKI-页面查看', component: Show},
            {path: '/page/edit', name: 'WIKI-编辑内容', component: Edit},
            {path: '/space/manage', name: 'WIKI-空间管理', component: spaceManage},
            {path: '/page/show/office', name: '查看内容', component: onlyOffice}
        ],
    },
    {
        path: '/login',
        name: '系统登录',
        component: login,
        meta: {fullscreen: true}
    },
    {
        path: '/setting',
        name: '账户设置',
        component: setting,
        redirect: '/setting/userInfo',
        children: [
            {path: '/setting/userInfo', name: '个人信息', component: userInfo},
            {path: '/setting/user', name: '用户管理', component: UserSetting},
            {path: '/setting/menu', name: '菜单管理', component: MenuSetting},
            {path: '/setting/role', name: '角色管理', component: RoleSetting}
        ]
    },
    // {
    //     path: '/b',
    //     name: 'PC端开放文档',
    //     component: ShareLayout,
    //     children: [
    //         {
    //             path: '/page/share/home',
    //             name: 'WIKI-开放文档',
    //             component: sharePcHome,
    //         },
    //         {
    //             path: '/page/share/view',
    //             name: 'WIKI-内容展示',
    //             component: sharePcView,
    //         },
    //     ],
    // },
    // {
    //     path: '/c',
    //     name: 'APP端开放文档',
    //     component: ShareMobileLayout,
    //     children: [
    //         {
    //             path: '/page/share/mobile/view',
    //             name: 'WIKI-开放文档-APP',
    //             component: shareMobileView,
    //         },
    //     ],
    // },
]

// 创建路由器
const router = createRouter({
    // 路由模式
    history:createWebHistory(),
    // 路由关系
    routes:routes

})
import { useTokenStore } from '@/stores/token.js';
import {ElMessageBox, ElMessage} from "element-plus";
import {isRelogin} from "../utils/request";


router.beforeEach((to, from, next) => {
    const store = useTokenStore();
    // 检查用户是否已登录
    if (store.token || to.path === '/login') {
        next() // 继续正常的路由导航
    } else {
        ElMessageBox.confirm('尚未登录，无法访问该界面', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            next('/login') // 重定向到登录页面
        }).catch(() => {
            next('/login') // 重定向到登录页面
        });

    }
})

// 导出路由
export default router
