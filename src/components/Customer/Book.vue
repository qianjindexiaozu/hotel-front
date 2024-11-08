<template>
    <div class="card-container">
        <div class="book-single">
            <el-card style="max-width: 280px">
                <template #header>单人间</template>
                <img
                :src="single"
                style="width: 100%"
                />
                <p class="price">{{ listData[0]['roomPrice'] }} ￥</p>
                <el-button @click="book(listData[0]['roomType'])" type="primary">预定</el-button>
            </el-card>  
        </div>
        <div class="book-double">
            <el-card style="max-width: 280px">
                <template #header>双人间</template>
                <img
                :src="double"
                style="width: 100%"
                />
                <p class="price">{{ listData[1]['roomPrice'] }} ￥</p>
                <el-button @click="book(listData[1]['roomType'])" type="primary">预定</el-button>
            </el-card>  
        </div>
        <div class="book-suite">
            <el-card style="max-width: 280px">
                <template #header>豪华套房</template>
                <img
                :src="suite"
                style="width: 100%"
                />
                <p class="price">{{ listData[2]['roomPrice'] }} ￥</p>
                <el-button @click="book(listData[2]['roomType'])" type="primary">预定</el-button>
            </el-card>  
        </div>
    </div>
    


    <!-- 预定弹窗 -->
    <el-dialog v-model="bookVisible" title="预定房间">
        <div class="demo-date-picker">
            <div class="block">
            <span class="demonstration">选择居住时间</span>
            <el-date-picker
                v-model="date"
                type="daterange"
                @change="dateChange"
                :disabledDate="disabledDateFun"
                @calendar-change="calendarChange"
                range-separator="至"
                start-placeholder="入住"
                end-placeholder="离开"
                :size="size"
            />
            </div>
            <p>入住当天下午入住，离开当天上午离开</p>
            <p>入住 {{ length }} 夜</p>
            <p class="price">{{ account.toFixed(2) }} ￥</p>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="bookVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmBook()" :disabled="confirmDisable">预定</el-button>
        </span>
    </el-dialog>

</template>

<script>
import room from '@/api/room';
import { ElNotification } from 'element-plus';
import single from '@/assets/imgs/single.jpg';
import double from '@/assets/imgs/double.jpg';
import suite from '@/assets/imgs/suite.jpg';
import reservation from '@/api/reservation';
  
export default {
    data() {
        return {
            listData: [
                {
                    roomType:'',
                    roomPrice:'',
                },
                {
                    roomType:'',
                    roomPrice:'',
                },
                {
                    roomType:'',
                    roomPrice:'',
                },
            ],        // 用来存储从后端获取的数据
            single,
            double,
            suite,
            condition:'',
            bookVisible: false, // 弹窗是否可见
            startDate: null,
            date: [],
            length:null,
            account:0,
            confirmDisable: true,
            formLabelWidth: '80px'
        };
    },
    methods: {
        // 获取后端数据
        fetchData() {
            room.getPrice().then((res) => {
                if(res.code === 0){
                    this.listData = res.data;
                    console.log(this.listData)
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
        dateChange(dates) {
            this.confirmDisable = true;
            this.date = dates
            if (dates === null || dates.length === 0) {
                this.startDate = null
            }
            this.length = (this.date[1] - this.date[0]) / (1000 * 60 * 60 * 24);
            if(this.condition === "Single"){
                this.account = this.listData[0]["roomPrice"] * this.length;
            } else if(this.condition === "Double"){
                this.account = this.listData[1]["roomPrice"] * this.length;
            } else{
                this.account = this.listData[2]["roomPrice"] * this.length;
            }
            this.date[0] = this.formatDate(this.date[0]);
            this.date[1] = this.formatDate(this.date[1]);
            room.questRoom(this.date, this.condition).then((res) => {
                if(res === true){
                    this.confirmDisable = false;
                }
                else{
                    ElNotification({
                        title:"Info",
                        message:res,
                        type:'info',
                    })
                }
            })
        },
        // 格式化日期为 yyyy-MM-dd
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        calendarChange(dates) {
            // 记录选择的开始日期，方便后面根据开始日期限定结束日期
            let hasSelectDate = dates !== null && dates.length > 0
            this.startDate = hasSelectDate ? dates[0] : null
        },
        disabledDateFun(time) {
            // 获取今天的时间戳
            const today = new Date();
            // 设置最多可以选择的日期（今天之后30天）
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 30);
            const maxDateTimestamp = maxDate.getTime();
            const minDate = new Date(today);
            minDate.setDate(today.getDate() - 1);
            const minDateTimestamp = minDate.getTime();
            // 默认只能选择今天或者今天之后最多30天的日期
            return time.getTime() < minDateTimestamp || time.getTime() > maxDateTimestamp;
        },
        
        book(condition){
            this.date = [];
            this.account = 0;
            this.length = 0;
            this.condition = condition;
            this.bookVisible = true;

        },
        confirmBook(){
            reservation.confirmBook(this.date, this.condition).then((res) => {
                if(res === true){
                    ElNotification({
                        title:'Success',
                        message:'预订成功！请按时到前台办理入住',
                        type:'success'
                    })
                    console.log(this.date);
                    this.bookVisible = false;
                    this.confirmDisable = true;
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
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px; /* 卡片之间的间距 */
    min-height: 80vh; /* 占满整个视口高度 */
}

.book-single, .book-double, .book-suite {
    display: flex;
    justify-content: center;
}

.price{
    color: #cf0003;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
}

</style>
