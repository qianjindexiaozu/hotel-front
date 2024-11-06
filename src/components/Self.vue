<template>
    <div class="self-form" style="display: flex;">
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="auto" style="max-width: 600px; margin-left: 50px;">
            <div style="text-align: left; font-size: 24px; height: 60px;"><b>个人信息</b></div>
            <el-form-item label="姓名" prop="name" style="margin: 20px 0;">
                <el-input id="name" v-model="ruleForm1.name" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="性别" prop="gender" style="margin: 20px 0;">
            <el-radio-group v-model="ruleForm1.gender">
                <el-radio id="gender-male" value="Male">男</el-radio>
                <el-radio id="gender-female" value="Female">女</el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber" style="margin: 20px 0;">
                <el-input id="idNumber" v-model="ruleForm1.idNumber" style="width: 300px;"/>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" style="margin: 20px 0;">
                <el-input id="phone" v-model="ruleForm1.phone" style="width: 300px;"/>
                <el-button v-bind:class="{grey:isGrey,blue:!isGrey}" 
                            v-bind:disabled="dis" type="primary" 
                            @click="getCode()"
                            style="margin-left: 10px;">
                    <span v-if="show">发送验证码</span>
                    <span v-else>重新发送({{count}}s)</span>
                </el-button>
            </el-form-item>
            <el-form-item label="验证码" prop="verification" style="margin: 20px 0;">
                <el-input id="verification" v-model="ruleForm1.verifyCode" style="width: 300px;"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" style="margin: 10px;" @click="changeInfo">修改</el-button>
                <el-button @click="handleCancle">取消</el-button>
            </el-form-item>
        </el-form>
            
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="auto" style="max-width: 600px; margin-left: 50px;">
            <div style="text-align: left; font-size: 24px; height: 60px;"><b>重置密码</b></div>
            <el-alert type="info" show-icon :closable="false">
                <p>密码应不少于6位，不多于30位，且同时包含数字和字母</p>
            </el-alert>
            <el-form-item label="新密码" prop="password" style="margin: 20px 0;">
                <el-input id="password" v-model="ruleForm2.password" style="width: 300px;" type="password" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" style="margin: 20px 0;">
                <el-input id="confirmPassword" v-model="ruleForm2.confirmPassword" style="width: 300px;" type="password" show-password/>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" style="margin: 10px;" @click="changePassword">修改</el-button>
                
            </el-form-item>
        </el-form>
    </div>
    <div class="logout">
        <el-button @click="handleLogOut">退出登录</el-button>
    </div>
</template>

<script>
import router from '@/router';
import user from '@/api/user.js';
import { ElNotification } from 'element-plus';
import store from '@/stores';

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
            if(value != this.ruleForm2.password){
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
            ruleForm1:{
                name:store.state.localStorage.name,
                gender:store.state.localStorage.gender,
                idNumber:store.state.localStorage.idNumber,
                phone:store.state.localStorage.phone,
                verifyCode:'',
            },
            ruleForm2:{
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
                verifyCode:[
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
        changePassword(){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid) {
                    user.changePassword(this.ruleForm2.password).then((res) => {
                        if(res === true){
                            ElNotification({
                                title:'Success',
                                message:'密码修改成功',
                                type:'success',
                                plain:'true',
                            })
                            setTimeout(() =>{
                                router.replace({
                                    path:'/'
                                })
                            }, 1000) 
                        }
                        else{
                            ElNotification({
                                title: 'Error',
                                message: res,
                                type: 'error',
                                plain: 'true',
                            })
                        }
                    })
                }
            })
        },
        changeInfo() {
            this.$refs.ruleForm1.validate((valid) => {
                if(valid) {
                    user.changeInfo(this.ruleForm1).then((res) => {
                        if(res === true){
                            ElNotification({
                                title:'Success',
                                message:'信息修改成功',
                                type:'success',
                                plain:'true',
                            })
                        }
                        else{
                            ElNotification({
                                title: 'Error',
                                message: res,
                                type: 'error',
                                plain: 'true',
                            })
                        }
                    })
                }
            })
        },
        getCode() {
            let valid = this.phoneRegex.test(this.ruleForm1.phone);
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
                user.getVerifyCode(this.ruleForm1.phone, "changeInfo").then((res) => {
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
        handleLogOut(){
            router.replace({
                path:'/'
            });
            store.commit('cleanToken');
        },
    }
}

</script>

<style>
.self-form{
    position: relative;
    background-color: rgb(244, 244, 244);
    height: 80vh;
}

.logout{
    background-color: rgb(244, 244, 244);
    height: 10vh;
}

.el-alert {
  margin: 0 auto;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>