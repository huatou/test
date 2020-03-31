<template>
    <div class="loginBox">
        <Logo class="logoBox"></Logo>
        <Title class="titleBox"></Title>
        <el-form class="formBox" :model="loginModel" label-width="80px">
            <el-input v-model="loginModel.username" placeholder="用户名"></el-input>
            <el-input v-model="loginModel.password" placeholder="密码"></el-input>
            <el-button type="primary" @click="submitLogin">登录</el-button>
            <router-link to="/login-main/register" class="registerBox">
                <el-button type="primary">注册</el-button>
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
                loginModel: {
                    username: null,
                    password: null
                }
            }
        },
        methods: {
            submitLogin() {


                // this.jquery.post("http://localhost:8080/zigar/login",this.loginModel,function(r){
                //     console.log(r);
                // });
                //
                //
                this.request.axiosLogin(this, this.loginModel, (data) => {
                    this.tokenUtil.setToken(data);
                    this.$router.push('/')
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

    .registerBox {
        margin-left: 10px;
    }


</style>