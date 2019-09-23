<template>
    <div class="loginBox">
        <Logo class="logoBox"></Logo>
        <Title class="titleBox"></Title>
        <el-form class="formBox" :model="registerModel" label-width="80px">
            <el-input v-model="registerModel.username" placeholder="用户名"></el-input>
            <el-input v-model="registerModel.displayName" placeholder="姓名"></el-input>
            <el-input v-model="registerModel.password" placeholder="密码"></el-input>
            <el-input v-model="registerModel.againPassword" placeholder="重复密码"></el-input>
            <el-button type="primary" @click="submitRegister">注册并登陆</el-button>
            <router-link class="routerButtonText" to="/login-main/login">
                <el-button type="primary">返回登录</el-button>
            </router-link>
        </el-form>
    </div>
</template>

<script>
    import Logo from "../../components/Logo";
    import Title from "../../components/Title";

    export default {
        name: "Login",
        components: {Title, Logo},
        data() {
            return {
                registerModel: {
                    username: null,
                    displayName: null,
                    password: null,
                    againPassword: null
                }
            }
        },
        methods: {
            submitRegister: function () {
                this.$axios.post(this.global.SERVER_PATH + this.requestUrl.REGISTER, this.registerModel)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>


    .loginBox {
        text-align: center;
    }

    .logoBox {
        margin-top: 60px;
    }

    .titleBox {
        display: block;
    }

    .formBox {
        width: 300px;
        margin: 0 auto;
    }

    .el-input {
        margin-top: 4px;
    }

    .el-button {
        margin-top: 8px;
    }

    .routerButtonText {
        text-decoration: none;
        color: white;
        margin-left: 10px;
    }


</style>