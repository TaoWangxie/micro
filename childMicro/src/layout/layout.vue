<template>
    <div class="layout">
        <div class="container">
            <!--左侧导航-->
            <sideBar></sideBar>
            <div class="main">
                <!--主主体-->
                <div class="content">
                    <router-view v-slot="{ Component }" :key="$route.path">
                        <transition name="fade" mode="out-in" appear>
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import _ from 'lodash';
import { ref } from 'vue';
import sideBar from './components/sideBar.vue';
</script>


<style lang="scss" scoped>
.layout {
    display: flex;
    height: 100%;
    flex-direction: column;
    .container {
        display: flex;
        height: 100%;
        overflow: hidden;
        .main {
            flex: 1;
            width: 0;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            background-color: #ebedf0;
            .content {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                overflow-x: hidden;
                border-radius: 4px;
            }
        }
    }
}
/* 路由切换动画 */
/* fade-transform */
.fade-enter-from,
.fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
.fade-enter-active {
    transition: all 0.7s ease;
}
.fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
