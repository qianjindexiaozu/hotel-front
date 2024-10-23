<template>
  <main>
    <p>这是主界面</p>
    <el-button type="primary" @click="jumpToLogin">Login</el-button>
  </main>
</template>

<script>
export default {
  methods:{
    jumpToLogin() {
      this.$router.push('/login')
    }
  }
}

</script>
