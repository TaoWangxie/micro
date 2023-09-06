import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 布局页面
const layout = () => import('@/layout/index.vue') // 作业管理

const baseRoute: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
]
const routes: Array<RouteRecordRaw> = [
    {
        path: '/layout',
        component: layout,
        name: 'layout',
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
            },
            {
                path: "/mircroChild/:page*",
                name: "mircroChild",
                component: () => import(/* webpackChunkName: "mircroChild" */ "@/views/mircroChild/index.vue"),
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(), // hash模式:createWebHashHistory，history模式:createWebHistory
    routes: [...baseRoute, ...routes]
});

export default router;
