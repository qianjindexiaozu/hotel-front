<template>
    这是管理员界面
</template>

<script>
export default{
    created(){
        setTimeout(() => {
            this.$router.push({
                path: '/'
            })
        }, 3000)
    }
}
</script>