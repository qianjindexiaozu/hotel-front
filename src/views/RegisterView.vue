<template>
    <div class="container">
        <Header></Header>
        <Register></Register>
        <Footer></Footer>
    </div>

</template>

<style>
.container{
    width: 100%;
}
</style>

<script>
import Header from '@/components/Header.vue';
import Register from '@/components/Register.vue';
import Footer from '@/components/Footer.vue';

export default {
    components:{
        Header,
        Register,
        Footer,
    }
}

</script>