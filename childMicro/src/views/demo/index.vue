<template>
    <div>
        <h1>demo</h1>
        <el-button type="primary" @click="toMsg">向主应用传递数据</el-button>
    </div>
</template>

<script lang="ts" setup>
import { useMicroStore } from '@/store/micro';

const microStoreData: any = useMicroStore();

const toMsg = () => {
    microStoreData.updateMicroData({ type: '子应用发送的数据' });
};
</script>