<template>
    <div class="title">
        <img :src="logo1" width="30">
        酒店管理系统
    </div>
</template>

<script>
import logo1 from '@/assets/imgs/logo1.png'

export default{
  data() {
    return{
      logo1,
    }
  }
}

</script>

<style>

.title {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-family: 'PingFang SC', '苹方', sans-serif; 
  font-weight: bold; 
  color: #000000;
  background-color: rgb(255, 255, 255);
  height: 60px;
}
</style>