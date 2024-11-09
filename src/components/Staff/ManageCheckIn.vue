<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="证件号码" prop="idNumber"></el-table-column>
            <el-table-column label="房间类型" prop="roomType"></el-table-column>
            <el-table-column label="入住时间" prop="checkInDate"></el-table-column>
            <el-table-column label="离开时间" prop="checkOutDate"></el-table-column>
            <el-table-column label="总金额" prop="amount"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="openEditDialog(scope.row)" size="small" type="primary">入住</el-button>   
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="editVisible" title="确认入住信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
                <el-form-item label="第二个人的姓名" prop="name2" style="margin: 20px 0;" v-if="visible">
                    <el-input id="name2" v-model="ruleForm.name2" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="第二个人的身份证号" prop="idNumber2" style="margin: 20px 0;" v-if="visible">
                    <el-input id="idNumber2" v-model="ruleForm.idNumber2" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="选择入住房间" prop="selectedRoomId">
                    <el-select v-model="ruleForm.selectedRoomId" placeholder="Select" style="width: 240px">
                        <el-option
                            v-for="item in rooms"
                            :key="item.roomId"
                            :label="item.roomNumber"
                            :value="item.roomId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">关闭</el-button>
            <el-button type="primary" @click="saveEdit()">确认入住</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import reservation from '@/api/reservation';
import { ElNotification } from 'element-plus';
import utils from '@/utils';
import bill from '@/api/bill';
import room from '@/api/room';
  
export default {
    data() {
        var checkIdNumber = (rule, value, callback) => {
            if(!value){
                return callback(new Error("身份证号码不能为空"))
            }
            const idCardRegex = /^(?:\d{15}|\d{17}[\dX])$/;
            let res = idCardRegex.test(value);
            if(!res){
                return callback(new Error("身份证号码格式错误"))
            }
            callback();
        };
        return {
            listData: [],        // 用来存储从后端获取的数据
            editVisible: false, // 弹窗是否可见
            formLabelWidth: '80px',
            reservationId:'',
            visible:false,
            ruleForm:{
                name2:'',
                idNumber2:'',
                selectedRoomId:'',
            },
            userId:'',
            rules:{
                name2:[
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                    {min:2, max:30, message: '长度应在2到30之间', trigger: 'blur'}
                ],
                idNumber2:[
                    {required: true, message: '身份证号码不能为空', trigger: 'blur'},
                    {validator: checkIdNumber, trigger: 'blur'}
                ],
                selectedRoomId:[
                    {required:true, message: '请选择房间', trigger: 'blur'}
                ]
            },
            rooms:[],
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            reservation.getCheckInInfo().then((res) => {
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
            this.ruleForm.name2='';
            this.ruleForm.idNumber2='';
            this.ruleForm.selectedRoomId='';
            this.reservationId = row.reservationId; // 将要编辑的行数据传入表单
            this.visible = (row.roomType !== 'Single');
            this.userId = row.userId;
            // console.log(this.reservationId)
            this.editVisible = true;
            console.log(row.roomType)
            room.getAvailableRoom(row.roomType).then((res) => {
                if(res.code === 0){
                    this.rooms = res.data;
                }
                else {
                    ElNotification({
                        title:'Error',
                        message:res.message,
                        type:'error',
                    })
                }
            })
        },
  
        // 保存编辑的数据
        saveEdit() {
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    bill.newBill(this.reservationId, this.userId, this.ruleForm).then((res) => {
                    if(res === true){
                        ElNotification({
                            title:'Success',
                            message:'入住成功',
                            type:'success',
                        })
                        this.fetchData();
                        this.editVisible = false;
                        this.visible = false;
                    }
                    else{
                        ElNotification({
                            title:'Error',
                            message:res,
                            type:'error',
                        })
                    }
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
