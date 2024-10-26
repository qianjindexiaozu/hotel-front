<template>
    <div class="contianer">
        <Header></Header>
        <Login></Login>
        <Footer></Footer>
    </div>
</template>

<style>
.container{
    max-height: fit-content;
}

</style>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Login from '@/components/Login.vue';
export default {
    components:{
        Footer,
        Header,
        Login
    }
}
</script>