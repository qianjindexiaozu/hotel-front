<template>
    <div>
        <!-- 列表展示 -->
        <el-table :data="listData" style="width: 100%">
            <el-table-column label="房间类型" prop="roomType"></el-table-column>
            <el-table-column label="价格" prop="roomPrice"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button @click="openEditDialog(scope.row)" size="small" type="primary">修改价格</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog v-model="editVisible" title="修改价格">
            <el-form :model="editForm" ref="editForm">
                <el-form-item label="房间价格" :label-width="formLabelWidth">
                <el-input v-model="newPrice"></el-input>
                </el-form-item>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="saveEdit(editForm, newPrice)">保存</el-button>
                </span>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import room from '@/api/room';
import { ElNotification } from 'element-plus';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            editVisible: false, // 弹窗是否可见
            editForm: {
                roomType: '',
                roomPrice: ''
            },
            newPrice: '',
            formLabelWidth: '80px'
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            room.getPrice().then((res) => {
                if(res.code === 0){
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
            this.newPrice = this.editForm.roomPrice;
            console.log("打开对话框")
        },
  
        // 保存编辑的数据
        saveEdit(editForm, newPrice) {
            if (!newPrice) {
                this.$message.error('房价不能为空');
                return;
            }

            // 2. 验证是否是有效数字
            if (isNaN(newPrice)) {
                this.$message.error('请输入有效的数字');
                return;
            }

            // 3. 格式化为两位小数
            console.log(newPrice);
            newPrice = Math.round(newPrice * 100) / 100;
            console.log(newPrice);

            room.setPrice(editForm, newPrice).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:'价格修改成功',
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
