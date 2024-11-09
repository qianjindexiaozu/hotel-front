<template>
    <el-container class="layout-container-demo" style="height: 90vh;">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu>
                    <el-menu-item index='1' @click="setCurrent('Book')">          
                        预订客房             
                    </el-menu-item>
                    <el-menu-item index='2' @click="setCurrent('Reservations')">          
                        我的预订             
                    </el-menu-item>
                    <el-menu-item index='3' @click="setCurrent('Bills')">          
                        我的订单             
                    </el-menu-item>
                    <el-menu-item index='4' @click="setCurrent('Self')">          
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
import Book from './Book.vue';
import Self from '../Self.vue';
import Bills from './Bills.vue';
import Reservations from './Reservations.vue';

export default {
    data() {
        return {
            name: store.state.localStorage.name,
            current: 'Book', // 默认显示的组件
        };
    },
    components: {
        Book,
        Self,
        Bills,
        Reservations,
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
