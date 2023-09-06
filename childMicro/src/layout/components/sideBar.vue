<template>
    <div class="side-bar">
        <el-menu
            :default-active="menusStoreData.activeIndex"
            class="el-menu-vertical-demo"
        >
            <template
                v-for="(menu, index) in menusStoreData.menus"
                :key="index"
            >
                <el-sub-menu v-if="menu.children" :index="menu.path">
                    <template #title>
                        <span>{{ menu.name }}</span>
                    </template>
                    <el-menu-item
                        v-for="menuChild in menu.children"
                        :key="menuChild.path"
                        :index="menuChild.path"
                        @click="menuItemClick(menuChild)"
                    >
                        {{ menuChild.name }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item
                    v-else
                    :index="menu.path"
                    @click="menuItemClick(menu)"
                >
                    {{ menu.name }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup lang='ts'>
import _ from 'lodash';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMenusStore } from '@/store/menus';
const router = useRouter();
const menusStoreData: any = useMenusStore();
//跳转页面
const menuItemClick = (item: any) => {
    router?.push({ path: item.path });
};
</script>

<style lang="scss" scoped>
.side-bar {
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border-right: 1px solid #dcdfe6;
    background-color: #fafafa;
    user-select: none;
    flex-shrink: 0;
}
::v-deep .el-menu {
    border: 0;
}
</style>