<template>
    <LoginedHeader></LoginedHeader>
    <Staff></Staff>
    <Footer></Footer>
</template>

<script>
import router from '@/router';
import LoginedHeader from '@/components/LoginedHeader.vue';
import Footer from '@/components/Footer.vue';
import Staff from '@/components/Staff/Staff.vue'
import store from '@/stores';

export default{
    created(){
        if(store.state.token === ''){
            router.replace({
                path:"/"
            })
        }
        setTimeout(() => {
            router.replace({
                path: '/'
            })
        }, 1000 * 60 * 60)  // 一小时后强制退回登陆页面
    },
    components:{
        LoginedHeader,
        Footer,
        Staff,
    },
}
</script>