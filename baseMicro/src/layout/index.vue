<template>
    <div class="layout">
        <!--顶部导航-->
        <navBar></navBar>
        <div class="container">
            <!--左侧导航-->
            <div class="main">
                <!--主主体-->
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
  <script setup lang='ts'>
import _ from 'lodash';
import { ref, getCurrentInstance, onMounted } from 'vue';
import navBar from './components/navBar.vue';
// import sideBar from './components/sideBar.vue';
</script>
  
  
<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    .container {
        display: flex;
        height: calc(100vh - 50px);
        overflow: hidden;
        .main {
            flex: 1;
            width: 0;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            background-color: #fff;
            .content {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                overflow: auto;
                border-radius: 4px;
            }
        }
    }
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
  