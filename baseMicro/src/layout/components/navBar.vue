<template>
    <div class="nav-bar">
        <div class="logo" @click="back">MICRO</div>
    </div>
</template>
<script setup lang='ts'>
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useMicroStore } from '@/store/micro';
const microStoreData: any = useMicroStore();
const router = useRouter();
const back = () => {
    // microStoreData.updateMicroConfig(null);
    router.push('/home');
};
</script>

<style lang="scss" scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    height: 50px;
    padding: 0 30px;
    box-sizing: border-box;
    box-shadow: 0 4px 13px -3px rgba(0, 0, 0, 0.10196);
    border-bottom: 1px solid #d2d2d2;
    z-index: 9;
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1px;
        cursor: pointer;
    }
}
</style>