import api from '@/utils/index.js'
import router from '@/router';
import store from '@/stores';
import { md5 } from 'js-md5';

export default{
    login,
    getVerifyCode,
    register,
}

async function login(phone, password){
    let response = await api.post('user/login', {
        "phone":phone,
        "password": md5(password),
    })
    if (response.data.code === 0) {
        // console.log(response.data); // 请求成功，response为成功信息
        store.commit('setToken', response.data.data)    //设置token
        store.commit('parseToken', phone)
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
        console.log(response);  // 请求失败，response为失败信息
        console.log(phone, password);
    }
   
}


async function getVerifyCode(phone) {
    let response = await api.post('user/register_sms', {
        "phone": phone,
    })
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
