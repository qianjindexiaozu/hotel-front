<template>
    <el-container class="layout-container-demo" style="height: 90vh;">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu>
                    <el-sub-menu index="1">
                        <template #title>
                            房间管理
                        </template> 
                        <el-menu-item index='1-1' @click="setCurrent('ManageRoom')">          
                            房间设置
                        </el-menu-item>
                        <el-menu-item index='1-2' @click="setCurrent('ManagePrice')">          
                            价格设置
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index='2' @click="setCurrent('ManageStaff')">          
                        员工管理
                    </el-menu-item>
                    <el-menu-item index='3' @click="setCurrent('Details')">          
                        盈利数据
                    </el-menu-item>
                    <el-menu-item index='4' @click="setCurrent('Feedback')">          
                        反馈情况
                    </el-menu-item>
                    <el-menu-item index='5' @click="setCurrent('Self')">          
                        个人中心
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main  style="margin: 0; padding: 0;">
                <component v-bind:is="current"></component>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import store from '@/stores';
import ManageStaff from './ManageStaff.vue';
import ManageRoom from './ManageRoom.vue';
import Self from '../Self.vue';
import Details from './Details.vue';
import Feedback from './Feedback.vue';
import ManagePrice from './ManagePrice.vue';

export default {
    data() {
        return {
            name: store.state.localStorage.name,
            current: 'Book', // 默认显示的组件
        };
    },
    components: {
        Self,
        ManageRoom,
        ManageStaff,
        Details,
        Feedback,
        ManagePrice,
    },
    methods: {
        setCurrent(component) {
            this.current = component; // 更新当前组件
        }
    }
}
</script>

<style>
.el-aside {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}
</style>
