import api from '@/utils/index.js'
import router from '@/router';
import { md5 } from 'js-md5';

export default{
    login,
}

function login(phone, password){
    api.post('user/login', {
        "phone":phone,
        "password": md5(password),
    }, response => {
        if (response.data.code === 0) {
            console.log(response.data); // 请求成功，response为成功信息
            router.push({
                path:"/admin"
            })
        } else {
            console.log(response);  // 请求失败，response为失败信息
            console.log(phone, password);
        }
    });
}