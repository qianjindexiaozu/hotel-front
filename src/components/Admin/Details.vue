<template>
    <el-row style="margin: 20px;">
        <el-col :span="10">
            <div class="statistic-card">
                <el-tooltip
                    effect="dark"
                    content="RevPAR=总营业额/总可用房间数"
                    placement="top"
                >
                    <el-statistic title="本月RevPAR" :value="RevPAR"/>
                </el-tooltip>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="statistic-card">
                <el-statistic title="本月总营业额（￥）" :value="sumIncome.toFixed(2)" />
            </div>
        </el-col>
    </el-row>

    <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import { ElNotification } from 'element-plus';
import bill from '@/api/bill';
import room from '@/api/room';
import * as echarts from "echarts";

  
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
            xData: ["单人间", "双人间", "套房"], //横坐标
            myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
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
                    this.initEcharts();
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
        initEcharts() {
        // 多列柱状图
        const mulColumnZZTData = {
            xAxis: {
                data: this.xData
            },
            // 图例
            legend: {
                data: ["订单数", "营业额"],
                top: "0%"
            },
            yAxis: [
                {
                    type: 'value',
                    name: '订单数',
                    min: 0,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: '营业额',
                    min: 0,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value} ￥'
                    }
                }
            ],
            series: [
                {
                    type: "bar", //形状为柱状图
                    data: [this.singleNumber, this.doubleNumber, this.suiteNumber],
                    yAxisIndex: 0,
                    name: "订单数", // legend属性
                    label: {
                        // 柱状图上方文本标签，默认展示数值信息
                        show: true,
                        position: "top"
                    }
                },
                {
                    type: "bar", //形状为柱状图
                    data: [this.singleIncome, this.doubleIncome, this.suiteIncome],
                    yAxisIndex: 1,
                    name: "营业额", // legend属性
                    label: {
                        // 柱状图上方文本标签，默认展示数值信息
                        show: true,
                        position: "top"
                    }
                }
            ]
        };
        const myChart = echarts.init(document.getElementById("mychart"));
            myChart.setOption(mulColumnZZTData);
            //随着屏幕大小调节图表
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        }
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
