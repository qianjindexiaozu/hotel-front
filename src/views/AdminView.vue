<template>
    这是管理员界面
    名字：{{ name }}
    手机号：{{ phone }}
</template>

<script>
import store from '@/stores';
import router from '@/router';

export default{
    created(){
        if(store.state.token === ''){
            router.replace({
                path:"/"
            })
        }
        this.name = store.state.localStorage.name;
        this.phone = store.state.localStorage.phone;
        setTimeout(() => {
            this.$router.push({
                path: '/'
            })
        }, 1000 * 60 * 60 * 6)  // 六小时后强制退回登陆页面
    },
    data() {
        return{
            name:'',
            phone:'',
        }
    }
}
</script>