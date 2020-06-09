<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/a5.jpg" alt="">
            </div>

            <!-- 登录表单 -->    <!-- ref 拿到表单的实例对象 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">

                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
                
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input   v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
                    type="password"></el-input>
                </el-form-item>

                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 登录表单的数据对象绑定
            loginForm: {
                username: 'admin',
                password: '123456'
            },

            // 表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            }
        };
    },

    methods: {
    // 点击重置表单
    resetLoginForm() {
        // console.log(this)
        this.$refs.loginFormRef.resetFields();
    },
    // 点击登录
    login() {
        this.$refs.loginFormRef.validate(async valid => {  //async异步函数
            // console.log(valid);
            if( !valid ) return;      //await只能用于被async修饰的函数
            const { data:res}  = await this.$http.post( "login" , this.loginForm);
            console.log(res)
            if( res.meta.status !==200 ) return this.$message.error("登录失败！");
            this.$message.success("登录成功！");
            // 1. 将登录成功之后的 token ，保存在客户端  sessinStorage
            // 1.1 项目中除了登录之外的接口只能在 登录之后才能访问
            // 1.2 token 只在当前网页打开期间生效，所以将token 保存在sessinStorage
            // 2.通过编程式导航跳转至后台主页
            window.sessionStorage.setItem( "token",res.data.token);
            this.$router.push("/home");
        });
    }
    }
};
</script>
<style lang="less" scoped>  //scped仅使用当前页面
.login_container{
    // background-color: cornflowerblue;
    background: url(../assets/a4.jpg);
    background-size: cover;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: azure;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 10px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    // background-color: #fff;
}
.avatar_box>img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;  //不会超出盒子范围
}
.btns{
    display: flex;
    justify-content: flex-end;
}

</style>
