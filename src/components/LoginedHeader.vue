<template>
    <div class="title">
        <img :src="logo1" width="30" style="margin-left: 10px; margin-right: 10px;">
        酒店管理系统
        <el-avatar
            :src="avatarSrc"
            style="margin-left: 80%;"
        />
    </div>
</template>

<script>
import logo1 from '@/assets/imgs/logo1.png'
import store from '@/stores';

export default{
  data() {
    return{
      logo1,
      avatarSrc:'',
    }
  },
  created(){
    if(store.state.localStorage.pic === "default"){
      this.avatarSrc = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }
    else{
      this.avatarSrc = store.state.localStorage.pic;
    }
  },
  methods:{
    setAvater(){
      
    }
  }
}

</script>

<style>

.title {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-family: 'Ding', sans-serif; 
  /* font-weight: bold;  */
  color: #000000;
  background-color: rgb(255, 255, 255);
  height: 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}
</style>