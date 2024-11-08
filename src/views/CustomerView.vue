<template>
    <Header></Header>
    <Reserve></Reserve>
    <Footer></Footer>
</template>

<script>
import Header from '@/components/Customer/Header.vue';
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
        Header,
        Reserve,
        Footer,
    }
}

</script>