<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="房间类型" prop="roomType"></el-table-column>
            <el-table-column label="入住时间" prop="checkInDate"></el-table-column>
            <el-table-column label="离开时间" prop="checkOutDate"></el-table-column>
            <el-table-column label="总金额" prop="amount"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button v-if="scope.row.paymentStatus === 'Unpaid'" 
                        @click="openPayDialog(scope.row)" size="small" type="success">
                        支付
                    </el-button>
                    <el-button v-else-if="scope.row.feedbackStatus === 'Unfinished'" 
                        @click="openFeedbackDialog(scope.row)" size="small" type="primary">
                        评价
                    </el-button>
                    <el-button v-else 
                        @click="openFeedbackDialog(scope.row)" size="small" type="primary">
                        查看评价
                    </el-button>
                    
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="paymentVisible" title="确认支付">  
            <p class="price">{{ this.billInfo.amount }} ￥ </p>          
            <span slot="footer" class="dialog-footer">
            <el-button @click="paymentVisible = false">取消</el-button>
            <el-button type="success" @click="confirmPayment()">确认支付</el-button>
            </span>
        </el-dialog>
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
            paymentVisible: false, // 弹窗是否可见
            feedbcakVisible: false,
            formLabelWidth: '80px',
            billInfo:{},

        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            bill.getBillInfo().then((res) => {
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
        openPayDialog(row) {
            this.billInfo=row;
            this.paymentVisible = true;
        },
        confirmPayment(){
            bill.confirmPayment(this.billInfo.billId).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:'支付成功',
                        type:'success',
                    })
                    this.billInfo = {};
                    this.paymentVisible = false;
                    this.fetchData();
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

        openFeedbackDialog(row){
            this.feedbcakVisible=true;
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
.price{
    color: #cf0003;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
}
</style>
