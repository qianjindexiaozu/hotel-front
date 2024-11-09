<template>
    <div>
        <div v-for="item in listData">
            <el-descriptions
                class="margin-top"
                :column="4"
                :size="size"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"> <user /> </el-icon>
                            姓名
                        </div>
                    </template>
                    {{ item.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"> <iphone /> </el-icon>
                            手机号
                        </div>
                    </template>
                    {{ item.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"> <Clock /></el-icon>
                            评论时间
                        </div>
                    </template>
                    {{ item.submittedDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"><House /></el-icon>
                            房间
                        </div>
                    </template>
                    {{ item.roomType }} {{ item.roomNumber }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle"><Histogram /></el-icon>
                            评分
                        </div>
                    </template>
                    <el-rate v-model="item.rating" :colors="colors" size="large" allow-half />
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                        <el-icon :style="iconStyle"> <ChatDotRound /></el-icon>
                        评价
                        </div>
                    </template>
                    <p v-if="item.comments===''">此用户未填写评价</p>
                    <p v-else>{{ item.comments }}</p>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script>
import { ElNotification } from 'element-plus';
import utils from '@/utils';
import bill from '@/api/bill';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            colors:['#99A9BF', '#F7BA2A', '#FF9900'],
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            bill.getFeedbacks().then((res) => {
                if(res.code === 0){
                    this.listData = res.data;
                    let length = this.listData.length;
                    for(let i = 0; i < length; i++){
                        let newDate = {};
                        newDate = new Date(this.listData[i].submittedDate);
                        this.listData[i].submittedDate = utils.formatDate(newDate);
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
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
