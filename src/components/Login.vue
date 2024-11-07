<template>
    <div class="carousel-container">
        <el-carousel height="95vh">
            <el-carousel-item v-for="item in images" :key="item">
                <img :src="item" alt="Carousel Image" class="carousel-image" />
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="login-form">
        <img :src="logo2" class="logo"/>
        <div style="margin: 20px 0; text-align: center;font-size: 24px"><b>登 录</b></div>
        <el-form class="form-container" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="phone" style="margin-top: 20px;">
                <el-icon style="margin-right: 5px;"><Cellphone /></el-icon>
                <el-input id="phone" v-model="ruleForm.phone" style="width: 240px" placeholder="请输入注册手机号" />
            </el-form-item>
            <div style="margin: 10px 0"></div>
            <el-form-item prop="password">
                <el-icon style="margin-right: 5px;"><Key /></el-icon>
                <el-input
                    v-model="ruleForm.password"
                    style="width: 240px"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                />
            </el-form-item>
            <div style="margin: 20px 0"></div>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-row style="margin-top: 40px; width: 100%;">
                <el-col style="text-align: left;" :span="12"><el-link @click="handleRegiaster">还没注册？</el-link></el-col>
                <el-col style="text-align: right;" :span="12"><el-link @click="handleForget">忘记密码？</el-link></el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import img1 from '@/assets/imgs/1.jpg'
import img2 from '@/assets/imgs/2.jpg'
import img3 from '@/assets/imgs/3.jpg'
import img4 from '@/assets/imgs/4.jpg'
import logo1 from '@/assets/imgs/logo1.png'
import logo2 from '@/assets/imgs/logo2.png'
import router from '@/router'
import user from '@/api/user.js'
import { ElNotification } from 'element-plus'


export default {
    data() {
        var checkPhone = (rule, value, callback) => {
            if(!value){
                return callback(new Error("手机号码不能为空"))
            }
            let res = this.phoneRegex.test(value);
            if(!res){
                return callback(new Error("手机号码格式错误"))
            }
            callback();
        };
        return {
            images: [
                img1,
                img2,
                img3,
                img4
            ],
            logo1,
            logo2,
            ruleForm:{
                phone:'',
                password:'',
            },
            rules:{
                phone:[
                    {required: true, message: '手机号码不能为空', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
                password:[
                    {required: true, message: '请填写密码', trigger: 'blur'},
                ],
            },
            message:'',
            phoneRegex: /^1[3-9]\d{9}$/,
        };
    },
    methods:{
        handleLogin(){
            user.login(this.ruleForm.phone, this.ruleForm.password).then((res) =>{
                if(res != null){
                    ElNotification({
                        title:"Error",
                        message:res,
                        type:"error",
                        plain:true
                    })
                }
            })
        },
        handleRegiaster(){
            router.push({
                path: '/register'
            })
        },
        handleForget(){
            router.push({
                path:'/forget'
            })
        }
    },
};
</script>

<style>
.carousel-container {
  position: relative;
  height: auto;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 保持图片比例，填满容器 */
}

.el-carousel {
    height: 100%; /* 占据整个视口高度 */
}

.login-form{
    position: absolute;
    top: 30%;
    left: 70%;
    height: 300px;
    padding: 20px; /* 内边距 */
    background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
    border-radius: 8px; /* 圆角边框 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.logo {
    position: absolute;
    width: 80px;
}

.form-container {
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  align-items: center;    /* 水平居中 */
}

</style>