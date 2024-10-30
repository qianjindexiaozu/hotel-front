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
        <div class="form-container">
            <div style="margin-top: 20px;">
                <el-icon style="margin-right: 5px;"><Cellphone /></el-icon>
                <el-input v-model="phone" style="width: 240px" placeholder="请输入注册手机号" />
            </div>
            <div style="margin: 10px 0"></div>
            <div>
                <el-icon style="margin-right: 5px;"><Key /></el-icon>
                <el-input
                    v-model="password"
                    style="width: 240px"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                />
            </div>
            <div style="margin: 20px 0"></div>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-row style="margin-top: 40px; width: 100%;">
                <el-col style="text-align: left;" :span="12"><el-link @click="handleRegiaster">还没注册？</el-link></el-col>
                <el-col style="text-align: right;" :span="12"><el-link @click="handleForget">忘记密码？</el-link></el-col>
            </el-row>
        </div>
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


export default {
    data() {
        return {
            images: [
                img1,
                img2,
                img3,
                img4
            ],
            logo1,
            logo2,
            phone:'',
            password:'',
            message:'',
        };
    },
    methods:{
        handleLogin(){
            console.log(user.login(this.phone, this.password))
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