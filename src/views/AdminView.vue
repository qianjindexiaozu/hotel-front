<template>
    <LoginedHeader></LoginedHeader>
    <Admin></Admin>
    <Footer></Footer>
</template>

<script>
import router from '@/router';
import LoginedHeader from '@/components/LoginedHeader.vue';
import Footer from '@/components/Footer.vue';
import Admin from '@/components/Admin/Admin.vue';

export default{
    created(){
        // if(store.state.token === ''){
        //     router.replace({
        //         path:"/"
        //     })
        // }
        setTimeout(() => {
            router.replace({
                path: '/'
            })
        }, 1000 * 60 * 60)  // 一小时后强制退回登陆页面
    },
    components:{
        LoginedHeader,
        Footer,
        Admin,
    },
}
</script>