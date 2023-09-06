<template>
    <div>
        <h1>child-micro</h1>
        <el-button type="primary">Primary</el-button>
        <el-icon :size="20">
            <Edit />
        </el-icon>
        <div>{{ userStoreData.name }}</div>
        <div @click="change">修改</div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { Edit } from '@element-plus/icons-vue';

const userStoreData = useUserStore();

const change = () => {
    userStoreData.updateName('李四2');
};
</script>