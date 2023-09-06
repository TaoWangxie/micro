<template>
    <div class="navList">
        <div
            class="navTab"
            v-for="(child, index) in childConfigs"
            :key="index"
            @click="menuItemClick(child)"
        >
            <div class="title">{{ child.childLabel }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMicroStore } from '@/store/micro';
import { childConfigs, menus } from '@/utils/microConfigs';
const router = useRouter();
const microStoreData: any = useMicroStore();
const menuItemClick = (child: any) => {
    microStoreData.updateMicroConfig(child);
    router.push({ path: '/mircroChild' });
};
</script>

<style lang="scss" scoped>
.navList {
    display: flex;
    width: 100%;
    .navTab {
        width: calc(100% / 6);
        padding: 15px 10px;
        margin-right: 10px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px #ccc;
        .title {
            font-size: 14px;
        }
    }
}
</style>