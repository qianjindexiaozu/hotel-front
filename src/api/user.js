import api from '@/utils/index.js'
import router from '@/router';
import store from '@/stores';
import { md5 } from 'js-md5';
import axios from 'axios';

export default{
    login,
    getVerifyCode,
    register,
    forget,
    changePic,
    changeInfo,
    changePassword,
}

async function login(phone, password){
    let response = await api.post('user/login', {
        "phone":phone,
        "password": md5(password),
    })
    if (response.data.code === 0) {
        // console.log(response.data); // 请求成功，response为成功信息
        store.commit('setToken', response.data.data)    //设置token
        store.commit('parseToken')
        if(store.state.localStorage.role === "Admin"){
            router.push({
                path:"/admin"
            })
        }
        else if(store.state.localStorage.role === "Staff"){
            router.push({
                path:"/staff"
            })
        }
        else if(store.state.localStorage.role === "Customer"){
            router.push({
                path:"/customer"
            })
        }
        else{
            alert("登陆失败，请重试或咨询管理员！")
        }
        
    } else {
        console.log(response)
        return response.data.message;
    }
   
}


async function getVerifyCode(phone, condition) {
    let response;
    if(condition === "register"){
        response = await api.post('user/register_sms', {
            "phone": phone,
        })
    } else if (condition === "forget") {
        response = await api.post('user/forget_sms', {
            "phone": phone,
        })
    } else{
        response = await api.post('user/changeInfo_sms', {
            "phone": phone,
        })
    }
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function register(ruleForm) {
    let response = await api.post('user/register',{
        "name": ruleForm.name,
        "gender": ruleForm.gender,
        "idNumber": ruleForm.idNumber,
        "phone": ruleForm.phone,
        "password": md5(ruleForm.password),
        "verifyCode": ruleForm.verification,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function forget(ruleForm) {
    let response = await api.post('user/forget',{
        "phone": ruleForm.phone,
        "password": md5(ruleForm.password),
        "verifyCode": ruleForm.verification,
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}

async function changePic(file) {
    const formData = new FormData();
    const token = store.state.token;
    
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8080/user/change_pic', formData, {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }
        });
        
        // 检查后端返回的响应状态
        if (response.data.code === 0) {
            store.commit('setToken', response.data.data); // 更新 token
            store.commit('parseToken');
            return true; // 成功时返回 true
        } else {
            return response.data.message; // 返回错误消息
        }
    } catch (error) {
        console.error("上传头像失败:", error);
        return "上传头像失败，请重试"; // 错误时返回统一的错误提示
    }
}


async function changeInfo(ruleForm) {
    let response = await api.put('user/changeInfo', {
        "token": store.state.token,
        "name": ruleForm.name,
        "gender": ruleForm.gender,
        "idNumber": ruleForm.idNumber,
        "phone": ruleForm.phone,
        "verifyCode": ruleForm.verifyCode
    })
    if(response.data.code === 0){
        store.commit('setToken', response.data.data)    //设置token
        store.commit('parseToken')
        return true;
    }
    else{
        return response.data.message;
    }
}

async function changePassword(password) {
    let response = await api.put('user/changePassword', {
        "token": store.state.token,
        "password": md5(password),
    })
    if(response.data.code === 0){
        return true;
    }
    else{
        return response.data.message;
    }
}
