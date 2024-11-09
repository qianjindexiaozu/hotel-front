<template>
    
</template>

<script>
import { ElNotification } from 'element-plus';
import utils from '@/utils';
import bill from '@/api/bill';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            billInfo:{},
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            bill.getPaidBillInfo().then((res) => {
                if(res.code === 0){
                    this.listData = res.data;
                    let length = this.listData.length;
                    for(let i = 0; i < length; i++){
                        let newDate = {};
                        newDate = new Date(this.listData[i].checkInDate);
                        this.listData[i].checkInDate = utils.formatDate(newDate);
                        newDate = new Date(this.listData[i].checkOutDate);
                        this.listData[i].checkOutDate = utils.formatDate(newDate);
                    }
                }
                else{
                    ElNotification({
                        title:'Error',
                        message:res.message,
                        type:'error',
                    })
                }
            })
        },
  
    

    },
    mounted() {
      this.fetchData(); // 页面加载时获取数据
    }
};
</script>
  
<style scoped>
</style>
