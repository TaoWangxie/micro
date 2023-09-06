<template>
    <div class="home">
        <NavCard></NavCard>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import NavCard from './components/NavCard/index.vue';

const userStore = useUserStore();

const change = () => {
    userStore.updateName('李四');
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}
</style>