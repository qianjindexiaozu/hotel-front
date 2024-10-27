import api from '@/utils/index.js'
import router from '@/router';
import store from '@/stores';
import { md5 } from 'js-md5';

export default{
    login,
}

function login(phone, password){
    api.post('user/login', {
        "phone":phone,
        "password": md5(password),
    }).then(response => {
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
    ) ;
}