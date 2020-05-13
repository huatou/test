import Role from "./views/index/role/Role";

function config(vue, params, data, headers) {
    return {
        validateStatus(status) {
            if (status == 403) {
                vue.$store.commit('setToken', null);
                vue.$router.push("/login-main/login");
            }
            return status < 500; // 状态码在大于或等于500时才会 reject
        },
        headers: vue.jquery.extend({
            "Authorization": "Bearer " + vue.$store.getters.getToken
        }, headers),
        params: params,
        data: data
        // ,
        // proxyTable:
        //     vue.config.IS_DEV ?
        //         {
        //             '/': {
        //                 target: vue.global.HOST_PATH,//设置你调用的接口域名和端口号 需要加加http
        //                 changeOrigin: true,
        //                 pathRewrite: {
        //                     '^/': ''//这里理解成用‘/request’代替target里面的地址，后面组件中我们掉接口时直接用request代替 比如我要调用'http://22.00.100.100:3002/user/add'，在请求的时候接口直接写‘/request/user/add’即可
        //                 }
        //             }
        //         } : {}
    }
}

function axiosGetData(vue, url, params, onSuccess, onError) {
    vue.$axios.get(vue.global.API_PATH + url, config(vue, params)).then((response) => {
        if (response.data.success) {
            onSuccess && onSuccess(response.data.data);
        } else {
            alert(response.data.message);
            onError && onError(response);
        }
    }).catch((error) => {
        console.log(error);
        onError && onError(error);
    });
}

function axiosPostParam(vue, url, param, onSuccess, onError) {
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    vue.$axios.post(vue.global.API_PATH + url, param, config(vue, param, param, headers)).then((response) => {
        if (response.data.success) {
            onSuccess && onSuccess(response.data.data);
        } else {
            alert(response.data.message);
            onError && onError(response);
        }
    }).catch((error) => {
        console.log(error);
        onError && onError(error);
    });
}

function axiosPostData(vue, url, model, onSuccess, onError) {
    vue.$axios.post(vue.global.API_PATH + url, model, config(vue)).then((response) => {
        if (response.data.success) {
            onSuccess && onSuccess(response.data.data);
        } else {
            alert(response.data.message);
            onError && onError(response);
        }
    }).catch((error) => {
        console.log(error);
        onError && onError(error);
    });
}

function axiosPutData(vue, url, model, onSuccess, onError) {
    vue.$axios.put(vue.global.API_PATH + url, model, config(vue)).then((response) => {
        if (response.data.success) {
            onSuccess && onSuccess(response.data.data);
        } else {
            alert(response.data.message);
            onError && onError(response);
        }
    }).catch((error) => {
        console.log(error);
        onError && onError(error);
    });
}

function axiosDeleteData(vue, url, data, onSuccess, onError) {
    vue.$axios.delete(vue.global.API_PATH + url, config(vue, null, data)).then((response) => {
        if (response.data.success) {
            onSuccess && onSuccess(response.data.data);
        } else {
            alert(response.data.message);
            onError && onError(response);
        }
    }).catch((error) => {
        console.log(error);
        onError && onError(error);
    });
}


const LOGIN = "/login";
const LOGOUT = "/logout";
const REGISTER = "/user/register";

const USER = "/user";
const CHANGE_PWD = "/user/change-pwd";
const USER_AUTH = "/user/auth";
const ROLE_AUTH = "/role/auth";
const ROLE_USER = "/role-user";
const ROLE_USER_USERS = "/role-user/users";
const ROLE_USER_LIST = "/role-user/list";

const ROLE = "/role";
const MODULE = "/module";
const ACTION = "/action";
const MENU = "/menu";


export default {


    // 基础请求
    axiosGetData(vue, url, params, onSuccess, onError) {
        axiosGetData(vue, url, params, onSuccess, onError);
    },
    axiosPostData(vue, url, params, onSuccess, onError) {
        axiosPostData(vue, url, params, onSuccess, onError);
    },
    axiosPutData(vue, url, params, onSuccess, onError) {
        axiosPutData(vue, url, params, onSuccess, onError);
    },
    axiosDeleteData(vue, url, data, onSuccess, onError) {
        axiosDeleteData(vue, url, data, onSuccess, onError);
    },


    //登录，用户
    axiosLogin(vue, param, onSuccess, onError) {
        axiosPostParam(vue, LOGIN, param, onSuccess, onError);
    },
    axiosRegister(vue, model, onSuccess, onError) {
        axiosPostData(vue, REGISTER, model, onSuccess, onError);
    },
    axiosLogout(vue, onSuccess, onError) {
        axiosPostData(vue, LOGOUT, null, onSuccess, onError);
    },
    axiosGetCurrentUser(vue, onSuccess, onError) {
        axiosGetData(vue, USER, {userId: 'current'}, onSuccess, onError);
    },
    axiosGetUserList(vue, params, onSuccess, onError) {
        axiosGetData(vue, USER, params, onSuccess, onError);
    },
    axiosGetUser(vue, params, onSuccess, onError) {
        axiosGetData(vue, USER, params, onSuccess, onError);
    },
    axiosInsertUser(vue, data, onSuccess, onError) {
        axiosPostData(vue, USER, data, onSuccess, onError);
    },
    axiosUpdateUser(vue, data, onSuccess, onError) {
        axiosPutData(vue, USER, data, onSuccess, onError);
    },
    axiosDeleteUser(vue, data, onSuccess, onError) {
        axiosDeleteData(vue, USER, data, onSuccess, onError);
    },
    axiosChangePwd(vue, module, onSuccess, onError) {
        axiosPostData(vue, CHANGE_PWD, module, onSuccess, onError);
    },
    axiosUserAuthPost(vue, module, onSuccess, onError) {
        axiosPostData(vue, USER_AUTH, module, onSuccess, onError);
    },


    // 角色
    axiosGetRoleList(vue, params, onSuccess, onError) {
        axiosGetData(vue, ROLE, params, onSuccess, onError);
    },
    axiosRoleAuthPost(vue, module, onSuccess, onError) {
        axiosPostData(vue, ROLE_AUTH, module, onSuccess, onError);
    },
    axiosRoleUserGet(vue, params, onSuccess, onError) {
        axiosGetData(vue, ROLE_USER_USERS, params, onSuccess, onError);
    },
    axiosRoleUserPost(vue, module, onSuccess, onError) {
        axiosPostData(vue, ROLE_USER_LIST, module, onSuccess, onError);
    },
    axiosRoleUserDelete(vue, module, onSuccess, onError) {
        axiosDeleteData(vue, ROLE_USER, module, onSuccess, onError);
    },

    //模块，操作项
    axiosGetModuleList(vue, params, onSuccess, onError) {
        axiosGetData(vue, MODULE, params, onSuccess, onError);
    },
    axiosInsertModule(vue, data, onSuccess, onError) {
        axiosPostData(vue, MODULE, data, onSuccess, onError);
    },
    axiosUpdateModule(vue, data, onSuccess, onError) {
        axiosPutData(vue, MODULE, data, onSuccess, onError);
    },
    axiosDeleteModule(vue, data, onSuccess, onError) {
        axiosDeleteData(vue, MODULE, data, onSuccess, onError);
    },
    axiosGetActionList(vue, params, onSuccess, onError) {
        axiosGetData(vue, ACTION, params, onSuccess, onError);
    },
    axiosGetMenu(vue, params, onSuccess, onError) {
        axiosGetData(vue, MENU, params, onSuccess, onError);
    },


}



