<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="gender"></el-table-column>
            <el-table-column label="身份证号" prop="idNumber"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="openEditDialog(scope.row)" size="small" type="primary">修改</el-button>
                    <el-button @click="openDeleteDialog(scope.row)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button @click="openNewDialog" size="small" type="primary">新增</el-button>
        <!-- 新增弹窗 -->
        <el-dialog v-model="newVisible" title="新增员工信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
                <el-form-item label="姓名" prop="name" style="margin: 20px 0;">
                    <el-input id="name" v-model="ruleForm.name" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="性别" prop="gender" style="margin: 20px 0;">
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio id="gender-male" value="Male">男</el-radio>
                    <el-radio id="gender-female" value="Female">女</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNumber" style="margin: 20px 0;">
                    <el-input id="idNumber" v-model="ruleForm.idNumber" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" style="margin: 20px 0;">
                    <el-input id="phone" v-model="ruleForm.phone" style="width: 300px;"/>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" style="margin: 10px;" @click="newInfo">新增</el-button>
                    <el-button @click="newVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="editVisible" title="修改员工信息">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px; margin-left: 50px;">
                <el-form-item label="姓名" prop="name" style="margin: 20px 0;">
                    <el-input id="name" v-model="ruleForm.name" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="性别" prop="gender" style="margin: 20px 0;">
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio id="gender-male" value="Male">男</el-radio>
                    <el-radio id="gender-female" value="Female">女</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNumber" style="margin: 20px 0;">
                    <el-input id="idNumber" v-model="ruleForm.idNumber" style="width: 300px;"/>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" style="margin: 20px 0;">
                    <el-input id="phone" v-model="ruleForm.phone" style="width: 300px;"/>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" style="margin: 10px;" @click="changeInfo">修改</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除弹窗 -->
        <el-dialog v-model="deleteVisible" title="删除员工信息">
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
import user from '@/api/user';
import { ElMessage, ElNotification } from 'element-plus';
  
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
        var checkPhone = (rule, value, callback) => {
            if(!value){
                return callback(new Error("手机号码不能为空"))
            }
            let res = this.phoneRegex.test(value);
            if(!res){
                return callback(new Error("手机号码格式错误"))
            }
            callback();
        };
        return {
            listData: [],        // 用来存储从后端获取的数据
            editVisible: false, // 弹窗是否可见
            deleteVisible:false,
            newVisible:false,
            editForm: {
                userId: '',
                name: '',
                gender: '',
                idNumber: '',
                phone: '',
                password:'',
                role:'',
                regTime:'',
                userPic:'',
            },
            ruleForm: {
                name: '',
                gender: '',
                idNumber: '',
                phone: '',
            },
            formLabelWidth: '80px',
            rules:{
                name:[
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                    {min:2, max:30, message: '长度应在2到30之间', trigger: 'blur'}
                ],
                gender:[
                    {required: true, message: '性别必须填写', trigger: 'change'}
                ],
                idNumber:[
                    {required: true, message: '身份证号码不能为空', trigger: 'blur'},
                    {validator: checkIdNumber, trigger: 'blur'}
                ],
                phone:[
                    {required: true, message: '手机号码不能为空', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
            },
            phoneRegex: /^1[3-9]\d{9}$/,
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            user.getStaff().then((res) => {
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
            this.ruleForm.name = this.editForm.name;
            this.ruleForm.gender = this.editForm.gender;
            this.ruleForm.idNumber = this.editForm.idNumber;
            this.ruleForm.phone = this.editForm.phone;
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
                    user.setStaff(this.editForm.userId, this.ruleForm).then((res) => {
                        if(res === true){
                            ElNotification({
                                title:'Success',
                                message:'员工信息修改成功',
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
            user.deleteStaff(this.editForm.userId).then((res) => {
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
            this.ruleForm.name = '';
            this.ruleForm.gender = '';
            this.ruleForm.idNumber = '';
            this.ruleForm.phone = '';
        },
        newInfo(){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    user.newStaff(this.ruleForm).then((res) => {
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
