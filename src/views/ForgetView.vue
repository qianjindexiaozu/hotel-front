<template>
    <Header></Header>
    <Forget></Forget>
    <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Forget from '@/components/Forget.vue';

export default{
    components: {
        Header,
        Footer,
        Forget,
    }
}

</script>