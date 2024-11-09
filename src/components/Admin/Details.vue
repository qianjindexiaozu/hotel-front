<template>
    <el-row style="margin: 20px;">
        <el-col :span="10">
            <div class="statistic-card">
                <el-tooltip
                    effect="dark"
                    content="RevPAR=总营业额/总可用房间数"
                    placement="top"
                >
                    <el-statistic title="本月RevPAR" :value="RevPAR" />
                </el-tooltip>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="statistic-card">
                <el-statistic title="本月总营业额（￥）" :value="sumIncome.toFixed(2)" />
            </div>
        </el-col>
    </el-row>

    <p>单人间订单：{{ singleNumber }}</p>
    <p>单人间营业额：{{ singleIncome }}</p>
    <p>双人间订单：{{ doubleNumber }}</p>
    <p>双人间营业额：{{ doubleIncome }}</p>
    <p>套房订单: {{ suiteNumber }}</p>
    <p>套房营业额：{{ suiteIncome }}</p>
    <p>本月总营业额：{{ sumIncome }}</p>
    <p>总可用房间数: {{ sumRoomNumber }}</p>
    <p>本月RevPAR: {{ RevPAR }}</p>
</template>

<script>
import { ElNotification } from 'element-plus';
import bill from '@/api/bill';
import room from '@/api/room';
  
export default {
    data() {
        return {
            listData: [],        // 用来存储从后端获取的数据
            billInfo:{},
            sumIncome:0,
            singleNumber:0,
            singleIncome:0,
            doubleNumber:0,
            doubleIncome:0,
            suiteNumber:0,
            suiteIncome:0,
            RevPAR:0,
            sumRoomNumber:'',
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            room.getSumRoomNumber().then((res) => {
                if(res.code === 0){
                    this.sumRoomNumber = res.data;
                }
                else{
                    ElNotification({
                        title:'Error',
                        message:res.message,
                        type:'error',
                    })
                    return;
                }
            });
            bill.getThisMonthInfo().then((res) => {
                if(res.code === 0){
                    this.listData = res.data;
                    this.sumIncome = 0;
                    this.singleNumber = 0;
                    this.singleIncome = 0;
                    this.doubleNumber = 0;
                    this.doubleIncome = 0;
                    this.suiteNumber = 0;
                    this.singleIncome = 0;
                    this.RevPAR = 0;
                    let length = this.listData.length;
                    for(let i = 0; i < length; i++){
                        console.log(this.listData[i])
                        if(this.listData[i].roomType === 'Single'){
                            this.singleNumber++;
                            this.singleIncome += this.listData[i].amount;
                        }
                        else if(this.listData[i].roomType === 'Double'){
                            this.doubleNumber++;
                            this.doubleIncome += this.listData[i].amount;
                        }
                        else{
                            this.suiteNumber++;
                            this.suiteIncome += this.listData[i].amount;
                        }
                    }
                    this.sumIncome = this.singleIncome + this.doubleIncome + this.suiteIncome;
                    this.singleIncome = this.singleIncome.toFixed(2)
                    this.doubleIncome = this.doubleIncome.toFixed(2)
                    this.suiteIncome = this.suiteIncome.toFixed(2)
                    this.RevPAR = (this.sumIncome / this.sumRoomNumber).toFixed(2);
                }
                else{
                    ElNotification({
                        title:'Error',
                        message:res.message,
                        type:'error',
                    })
                }
            });
            
        },
    },
    mounted() {
      this.fetchData(); // 页面加载时获取数据
    }
};
</script>
  
<style scoped>
.el-col {
  text-align: center;
}
.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
}
</style>
