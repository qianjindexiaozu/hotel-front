<template>
    <div class="title">
        <img :src="logo1" width="30" style="margin-left: 10px; margin-right: 10px;">
        酒店管理系统
        <el-tooltip
        class="box-item"
        effect="dark"
        content="点击更换头像"
        placement="bottom"
      >
        <el-upload 
          :show-file-list="false"
          :before-upload="(file) => { if (beforeAvatarUpload(file)) uploadAvatar(file); }"
          :http-request="uploadHttpRequest"
          style="margin-left: 80%; margin-top: 1%;">
          <el-avatar :src="avatarSrc" />
        </el-upload>
      </el-tooltip>
        
    </div>
</template>

<script>
import logo1 from '@/assets/imgs/logo1.png'
import store from '@/stores';
import { ElMessage } from 'element-plus';
import user from '@/api/user';

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
      this.avatarSrc = "http://localhost:8080/assets/avatars/" + store.state.localStorage.pic;
    }
  },
  methods:{
    beforeAvatarUpload(file){
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG/PNG format!')
        return false
      } else if (file.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    },
    uploadAvatar(file){
      user.changePic(file).then((res) => {
        if(res === true){
          ElMessage({
            type:'success',
            message:'头像修改成功',
          })
          this.avatarSrc = "http://localhost:8080/assets/avatars/" + store.state.localStorage.pic;
        }
        else{
          ElMessage({
            type:'error',
            message:res,
          })
        }
      })
    },
    uploadHttpRequest(){

    }
  }
}

</script>

<style>

.title {
  display: flex;
  align-items: center;
  font-size: 30px;
  /* font-weight: bold;  */
  color: #000000;
  background-color: rgb(255, 255, 255);
  height: 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}
</style>