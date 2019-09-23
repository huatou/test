import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index/Index";
import Login from "./views/login/Login";
import Register from "./views/login/Register";
import LoginMain from "./views/login/LoginMain";
import User from "./views/index/User/User";
import UserLoginLog from "./views/index/UserLoginLog";
import Module from "./views/index/module/Module";
import Action from "./views/index/Action";
import Role from "./views/index/role/Role";
import Forbidden from "./views/index/forbidden/Forbidden";


Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '*', redirect: '/index'},
        {path: '/', redirect: '/index'},
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {path: '/index', redirect: '/index/user'},
                {
                    path: '/index/user',
                    name: 'index-user',
                    component: User
                },
                {
                    path: '/index/user-login-log',
                    name: 'index-userLoginLog',
                    component: UserLoginLog
                },
                {
                    path: '/index/module',
                    name: 'index-module',
                    component: Module
                },
                {
                    path: '/index/action',
                    name: 'index-action',
                    component: Action
                },
                {
                    path: '/index/role',
                    name: 'index-role',
                    component: Role
                }
            ]
        },
        {
            path: '/login-main',
            name: 'loginMain',
            component: LoginMain,
            children: [
                {
                    path: '/login-main/login',
                    name: 'login',
                    component: Login,
                    meta: {
                        needLogin: false
                    }
                },
                {
                    path: '/login-main/register',
                    name: 'register',
                    component: Register,
                    meta: {
                        needLogin: false
                    }
                }
            ]
        }
    ]
});
export default router;
