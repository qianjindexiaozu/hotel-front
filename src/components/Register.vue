<template>
    <div class="register-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
            <div style="text-align: left; font-size: 24px; height: 60px;"><b>新用户注册</b></div>
            <el-form-item label="姓名" prop="name" style="margin: 20px 0;">
                <el-input id="name" v-model="ruleForm.name" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="性别" prop="gender" style="margin: 20px 0;">
            <el-radio-group v-model="ruleForm.gender">
                <el-radio id="gender-male" value="Male">男</el-radio>
                <el-radio id="gender-female" value="Female">女</el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber" style="margin: 20px 0;">
                <el-input id="idNumber" v-model="ruleForm.idNumber" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" style="margin: 20px 0;">
                <el-input id="phone" v-model="ruleForm.phone" style="width: 300px;"/>
                <el-button v-bind:class="{grey:isGrey,blue:!isGrey}" 
                            v-bind:disabled="dis" type="primary" 
                            @click="getCode()"
                            style="margin-left: 10px;">
                    <span v-if="show">发送验证码</span>
                    <span v-else>重新发送({{count}}s)</span>
                </el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="verification" style="margin: 20px 0;">
                <el-input id="verification" v-model="ruleForm.verification" style="width: 300px;"/>
            </el-form-item>
            <el-alert type="info" show-icon :closable="false">
                <p>密码应不少于6位，不多于30位，且同时包含数字和字母</p>
            </el-alert>
            <el-form-item label="密码" prop="password" style="margin: 20px 0;">
                <el-input id="password" v-model="ruleForm.password" style="width: 300px;" type="password" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" style="margin: 20px 0;">
                <el-input id="confirmPassword" v-model="ruleForm.confirmPassword" style="width: 300px;" type="password" show-password/>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" style="margin: 10px;" @click="handleRegister">注册</el-button>
                <el-button @click="handleCancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import router from '@/router';
import user from '@/api/user.js';
import { ElNotification } from 'element-plus';

export default {
    data(){
        var checkIdNumber = (rule, value, callback) => {
            if(!value){
                return callback(new Error("身份证号码不能为空"))
            }
            const idCardRegex = /^(?:\d{15}|\d{17}[\dX])$/;
            let res = idCardRegex.test(value);
            if(!res){
                return callback(new Error("身份证号码格式错误"))
            }
            callback();
        };
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
        var checkPassword = (rule, value, callback) => {
            if(!value){
                return callback(new Error("密码不能为空"))
            }
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,30}$/;
            let res = passwordRegex.test(value);
            if(!res){
                return callback(new Error("密码应不少于6位，不多于30位，且同时包含数字和字母"))
            }
            callback();
        };
        var handleConfirmPassword = (rule, value, callback) => {
            if(!value){
                return callback(new Error("请确认密码"))
            }
            if(value != this.ruleForm.password){
                return callback(new Error("两次输入的密码不一致"))
            }
            callback()
        }
        return{
            dis: false,
            show: true,
            isGrey: false, //按钮样式
            timer: null, //设置计时器,
            count: "",
            ruleForm:{
                name:'',
                gender:'',
                idNumber:'',
                phone:'',
                verification:'',
                password:'',
                confirmPassword:'',
            },
            rules:{
                name:[
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                    {min:2, max:30, message: '长度应在2到30之间', trigger: 'blur'}
                ],
                gender:[
                    {required: true, message: '性别必须填写', trigger: 'change'}
                ],
                idNumber:[
                    {required: true, message: '身份证号码不能为空', trigger: 'blur'},
                    {validator: checkIdNumber, trigger: 'blur'}
                ],
                phone:[
                    {required: true, message: '手机号码不能为空', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
                verification:[
                    {required: true, message: '请填写短信验证码', trigger: 'blur'},
                ],
                password:[
                    {required: true, message: '请填写密码', trigger: 'blur'},
                    {validator: checkPassword, trigger: 'blur'}
                ],
                confirmPassword:[
                    {required: true, message: '请确认密码', trigger: 'blur'},
                    {validator: handleConfirmPassword, trigger: 'blur'}
                ]
            },
            phoneRegex: /^1[3-9]\d{9}$/,
        }
    },
    methods:{
        handleRegister() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // 表单验证通过，执行注册逻辑
                    console.log('注册验证通过', this.ruleForm);
                    user.register(this.ruleForm).then((res) => {
                        if(res === true){
                            ElNotification({
                                title: 'Success',
                                message: '注册成功！',
                                type: 'success',
                                plain: 'true',
                            })
                            setTimeout(() =>{
                                router.replace({
                                    path:'/'
                                })
                            }, 1000)    // 注册成功一秒后，跳转回登陆页面
                        }
                        else{
                            ElNotification({
                                title: 'Error',
                                message: res,
                                type: 'info',
                                plain: 'true',
                            })
                        }
                    })
                    
                } else {
                    console.log('表单验证失败');
                    return false;
                }
            });
        },
        handleCancle(){
            router.replace({
                path:'/'
            })
        },
        getCode() {
            let valid = this.phoneRegex.test(this.ruleForm.phone);
            if (valid) {
                let TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.isGrey = true;
                    this.show = false;
                    this.dis = true;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) { 
                            this.count--;
                        } else {
                            this.dis = false;
                            this.isGrey = false;
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
                user.getVerifyCode(this.ruleForm.phone, "register").then((res) => {
                    if(res === true){
                        ElNotification({
                            title: 'Success',
                            message:'验证码发送成功，请注意查收！',
                            type: 'success',
                            plain: 'true',
                        })
                    } else {
                        ElNotification({
                            title: 'Error',
                            message: res,
                            type: 'error',
                            plain: 'true',
                        })
                    }
                });
            }
            else {
                ElNotification({
                    title: 'Error',
                    message: '请先正确填写号码！',
                    type: 'error',
                    plain: 'true',
                })
            }
        },
    }
}

</script>

<style>
.register-form{
    position: relative;
    background-color: rgb(244, 244, 244);
    height: 100vh;
}
.el-alert {
  margin: 0 auto;
}

</style>