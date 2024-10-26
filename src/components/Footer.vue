<template>
    <div class="centered">
        <div></div>
        <p>Designed by qianjindexiaozu</p>
        <p>Contact me ?</p>
        <div class="icon-container">
            <a href="https://github.com/qianjindexiaozu">
                <img :src="github_svg" width="30" height="30">
            </a>
            <a href="https://blog.csdn.net/qq_64884009?spm=1010.2135.3001.5343">
                <img :src="csdn_svg" width="30" height="30">
            </a> 
            <a href="mailto:qianjindexiaozu@163.com">
                <img :src="mail_163_svg" width="30" height="30">
            </a>
        </div>
    </div>
</template>

<style>
.icon-container {
    display: flex;
    gap: 15px; /* 图标之间的间隙 */
    justify-content: center; /* 图标水平居中 */
    align-items: center; /* 图标垂直居中 */
}

.centered {
    background-color: #363636;
    color: #ffffff;
    flex-direction: column;
    align-items: center;
    display: flex;
    height: 40vh;
}

.el-footer {
    padding: 0; /* 去掉默认的内边距 */
    margin: 0;  /* 去掉默认的外边距 */
}


</style>

<script>
import github_svg from '@/assets/icons/svg/github.svg'
import csdn_svg from '@/assets/icons/svg/csdn.svg'
import mail_163_svg from '@/assets/icons/svg/163.svg'

export default {
    data() {
        return{
            github_svg,
            csdn_svg,
            mail_163_svg
        }
    }
}

</script>