<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="姓名1" prop="name1"></el-table-column>
            <el-table-column label="证件号码1" prop="idNumber1"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="姓名2" prop="name2"></el-table-column>
            <el-table-column label="证件号码2" prop="idNumber2"></el-table-column>
            <el-table-column label="房间类型" prop="roomType"></el-table-column>
            <el-table-column label="房间号" prop="roomNumber"></el-table-column>
            <el-table-column label="入住时间" prop="checkInDate"></el-table-column>
            <el-table-column label="离开时间" prop="checkOutDate"></el-table-column>
            <el-table-column label="总金额" prop="amount"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button v-if="scope.row.paymentStatus === 'Paid'" @click="openLeaveDialog(scope.row)" size="small" type="primary">离店</el-button>   
                    <p v-else>此用户尚未付款</p>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="leaveVisible" title="确认离店">            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">关闭</el-button>
            <el-button type="primary" @click="leave()">确认离店</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import bill from '@/api/bill';
import { ElNotification } from 'element-plus';
import utils from '@/utils';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            leaveVisible: false, // 弹窗是否可见
            formLabelWidth: '80px',
            billInfo:{},
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            bill.getCheckOutInfo().then((res) => {
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
  
        // 打开编辑弹窗
        openLeaveDialog(row) {
            this.billInfo = row;
            this.leaveVisible = true;
        },
        leave(){
            bill.leave(this.billInfo.billId).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:'办理离店成功',
                        type:'success',
                    })
                    this.billInfo = {};
                    this.fetchData();
                    this.leaveVisible = false;
                }
                else{
                    ElNotification({
                        title:'Error',
                        message:res,
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
.dialog-footer {
text-align: right;
}
</style>
