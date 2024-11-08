<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="房间类型" prop="roomType"></el-table-column>
            <el-table-column label="入住时间" prop="checkInDate"></el-table-column>
            <el-table-column label="离开时间" prop="checkOutDate"></el-table-column>
            <el-table-column label="总金额" prop="account"></el-table-column>
            <el-table-column label="状态" prop="reservationStatus"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <div v-if="scope.row.reservationStatus === 'Canceled'">
                        <p>已取消</p>
                    </div>
                    <div v-else>
                        <el-button :disabled="scope.row.reservationStatus === 'Canceled'" @click="openEditDialog(scope.row)" size="small" type="danger">取消订单</el-button>
                    </div> 
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="editVisible" title="确认取消订单">
            <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">关闭</el-button>
            <el-button type="danger" @click="saveEdit()">取消订单</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import reservation from '@/api/reservation';
import { ElNotification } from 'element-plus';
import utils from '@/utils';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            editVisible: false, // 弹窗是否可见
            formLabelWidth: '80px',
            reservationId:'',
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            reservation.getReservations().then((res) => {
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
        openEditDialog(row) {
            this.reservationId = row.reservationId; // 将要编辑的行数据传入表单
            this.editVisible = true;
            console.log(this.reservationId)
        },
  
        // 保存编辑的数据
        saveEdit() {
            reservation.cancelReservation(this.reservationId).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:'订单取消成功',
                        type:'success',
                    })
                    this.fetchData();
                    this.editVisible = false;
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
