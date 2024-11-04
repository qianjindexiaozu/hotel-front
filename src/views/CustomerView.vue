<template>
    <LoginedHeader></LoginedHeader>
    <Reserve></Reserve>
    <Footer></Footer>
</template>

<script>
import LoginedHeader from '@/components/LoginedHeader.vue';
import Footer from '@/components/Footer.vue';
import Reserve from '@/components/Reserve.vue';

export default{
    // created(){
    //     if (store.state.token === ''){
    //         router.replace({
    //             path:'/',
    //         })
    //     }
    // },
    components:{
        LoginedHeader,
        Reserve,
        Footer,
    }
}

</script>