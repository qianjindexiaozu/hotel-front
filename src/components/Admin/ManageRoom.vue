<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="房间代号" prop="roomNumber"></el-table-column>
            <el-table-column label="类型" prop="roomType"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="openEditDialog(scope.row)" size="small" type="primary" :disabled="scope.row.status === 'Occupied'">修改</el-button>
                    <el-button @click="openDeleteDialog(scope.row)" size="small" type="danger" :disabled="scope.row.status === 'Occupied'">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button @click="openNewDialog" size="small" type="primary">新增</el-button>
        <!-- 新增弹窗 -->
        <el-dialog v-model="newVisible" title="新增房间信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
                <el-form-item label="房间代号" prop="roomNumber" style="margin: 20px 0;">
                    <el-input id="roomNumber" v-model="ruleForm.roomNumber" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="类型" prop="roomType" style="margin: 20px 0;">
                    <el-select v-model="ruleForm.roomType" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status" style="margin: 20px 0;">
                    <el-select v-model="ruleForm.status" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in statuses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" style="margin: 10px;" @click="newInfo">新增</el-button>
                    <el-button @click="newVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="editVisible" title="修改房间信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
                <el-form-item label="房间代号" prop="roomNumber" style="margin: 20px 0;">
                    <el-input id="roomNumber" v-model="ruleForm.roomNumber" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="类型" prop="roomType" style="margin: 20px 0;">
                    <el-select v-model="ruleForm.roomType" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status" style="margin: 20px 0;">
                    <el-select v-model="ruleForm.status" placeholder="Select" style="width: 240px">
                    <el-option
                        v-for="item in statuses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" style="margin: 10px;" @click="changeInfo">修改</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除弹窗 -->
        <el-dialog v-model="deleteVisible" title="删除房间信息">
            <el-form :model="editForm" ref="editForm">
                <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取消</el-button>
                <el-button type="danger" @click="confirmDelete">确认</el-button>
                </span>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import room from '@/api/room';
import { ElMessage, ElNotification } from 'element-plus';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            editVisible: false, // 弹窗是否可见
            deleteVisible:false,
            newVisible:false,
            editForm: {
                roomNumber:'',
                roomType:'',
                status:'',
            },
            ruleForm: {
                roomNumber:'',
                roomType:'',
                status:'',
            },
            formLabelWidth: '80px',
            rules:{
                roomNumber:[
                    {required: true, message: '房间代号不能为空', trigger: 'blur'},
                ],
                roomType:[
                    {required: true, message: '房间类型必须选择', trigger: 'change'}
                ],
                status:[
                    {required: true, message: '房间状态必须选择', trigger: 'blur'},
                ],
            },
            types:[
                {
                    label:'单人间',
                    value:'Single'
                },
                {
                    label:'双人间',
                    value:'Double'
                },
                {
                    label:'套房',
                    value:'Suite'
                }
            ],
            statuses:[
                {
                    label:'空闲',
                    value:'Available'
                },
                {
                    label:'维护',
                    value:'Maintenance'
                }
            ],
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            room.getRoom().then((res) => {
                if(res.code === 0){
                    console.log(res.data)
                    this.listData = res.data;
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
            this.editForm = row; // 将要编辑的行数据传入表单
            this.editVisible = true;
            this.ruleForm.roomNumber = this.editForm.roomNumber;
            this.ruleForm.roomType = this.editForm.roomType;
            this.ruleForm.status = this.editForm.status;
            console.log("打开对话框")
        },

        openDeleteDialog(row) {
            this.editForm = row;
            this.deleteVisible = true;
        },
  
        // 保存编辑的数据
        changeInfo() {
            this.$refs.ruleForm.validate((valid) => {
                if(valid) {
                    room.setRoom(this.editForm.roomId, this.ruleForm).then((res) => {
                        if(res === true){
                            ElNotification({
                                title:'Success',
                                message:'房间信息修改成功',
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
                }
            })  
        },
        confirmDelete(){
           room.deleteRoom(this.editForm.roomId).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:"删除成功",
                        type:'success',
                    })
                    this.fetchData();
                    this.deleteVisible = false;
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
        openNewDialog(){
            this.newVisible = true;
        },
        newInfo(){
            room.newRoom(this.ruleForm).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:"新增成功",
                        type:'success',
                    })
                    this.fetchData();
                    this.newVisible = false;
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
