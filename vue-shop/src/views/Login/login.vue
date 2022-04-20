<template>
    <div class="login">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="~assets/logo.png" alt="">
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" class="logn_form" :rules="rules" label-width="0px" :model="loginForm">
                <!-- 账号 -->
                <el-form-item prop="username">
                    <el-input clearable v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input show-password type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="logo">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { postLogin } from "network/login.js";
export default {
    name:'Login',
    data () {
        /* let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
        var validateNewPwd = (rules, value, callback) => {
            if (!reg.test(value)) {
                callback(new Error('密码应是6-12位数字、字母或字符！'))
            } else {
                callback()
            }
        } */
        return {
            // 这是登陆表单的数据绑定对象
            loginForm:{
                username:"admin",
                password:12345
            },
            // 这是表单的验证规则的对象
            rules:{
                // 验证用户名是否合法
                username:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                // 复杂密码验证
                /* password:[
                    {required: true, validator: validateNewPwd, trigger: ['blur', 'change'] },
                ] */
                // 简单密码验证
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 重置按钮
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        // 登录按钮
        logo(){
            // 登陆前 表单数据 预验证
            this.$refs.loginFormRef.validate(vaild =>{
                // console.log(vaild) 默认参数  是一个boolean
                if(!vaild) return;// 如果为false就return 不发起请求
                const username = this.loginForm.username;
                const password = this.loginForm.password;
                // post请求   传data数据
                postLogin(username,password).then(res=>{
                    console.log(res.data);
                    const data = res.data;
                    if(data.meta.status !== 200){
                        this.$message.error('登录失败');
                    }else{
                        this.$message.success('登录成功');
                        // 1.将登陆成功之后的Token,保存到客户端的 sessionStorage中
                        //  1.1项目中除了登陆之外的其他api接口,必须在登陆之后才能访问
                        //  1.2token只应在当前网站打开期间生效,所以token保存在sessionStorage中
                        // 2.通过编程式导航跳转到后台主页,路由地址是/home

                        window.sessionStorage.setItem('token',data.data.token);
                        this.$router.push('/home');
                    }
                })
            });
            
        }
    }
}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background-color: #2b4b6b;
    .login_box{
        width: 450px;
        height: 300px;
        background-color: white;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            width: 130px;
            height: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: white;
            box-shadow: 0 0 10px #ddd;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        .logn_form{
            position: absolute;
            bottom: 0;
            box-sizing: border-box;
            width: 100%;
            padding: 0 20px;
            .btns{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}

</style>