<template>
    <LoginedHeader></LoginedHeader>
    <Reserve></Reserve>
    <Footer></Footer>
</template>

<script>
import LoginedHeader from '@/components/LoginedHeader.vue';
import Footer from '@/components/Footer.vue';
import Reserve from '@/components/Customer/Reserve.vue';
import store from '@/stores';
import router from '@/router';

export default{
    created(){
        if (store.state.token === ''){
            router.replace({
                path:'/',
            })
        }
        setTimeout(() => {
            this.$router.push({
                path: '/'
            })
        }, 1000 * 60 * 60)  // 一小时后强制退回登陆页面
    },
    components:{
        LoginedHeader,
        Reserve,
        Footer,
    }
}

</script>