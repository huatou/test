const SERVER_PATH = "http://127.0.0.1:8080/";
const PROJECT_NAME = "杨子华图书馆管理系统";
const MENU_LIST = [
    {
        text: "用户",
        to: "/index/user",
        icon: "el-icon-user",
        active: true
    },
    {
        text: "用户登录日志",
        to: "/index/user-login-log",
        icon: "el-icon-tickets"
    },
    {
        text: "模块管理",
        to: "/index/module",
        icon: "el-icon-tickets"
    },
    {
        text: "操作管理",
        to: "/index/action",
        icon: "fa fa-hand-pointer-o"
    },
    {
        text: "角色管理",
        to: "/index/role",
        icon: "fa fa-hand-pointer-o"
    }


];

export default {
    SERVER_PATH,
    PROJECT_NAME,
    MENU_LIST
}



