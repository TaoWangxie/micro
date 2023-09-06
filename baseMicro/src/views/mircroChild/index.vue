<template>
    <div class="child-micro">
        <!-- 
        name(必传)：应用名称
        url(必传)：应用地址，会被自动补全为http://localhost:3001/index.html
        baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/child-micro`
        -->
        <micro-app
            v-if="microStoreData.microConfig"
            class="micro_child_wrapper"
            :name="microStoreData.microConfig.childName"
            :url="microStoreData.microConfig.childUrl"
            inline
            disableSandbox
            :keep-alive="microStoreData.microConfig.keepAlive"
            @mounted="mounted"
            @datachange="childDataChange"
        ></micro-app>
    </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMicroStore } from '@/store/micro';
const microStoreData: any = useMicroStore();

const mounted = () => {
    microStoreData.updateMicroGlobalData();
};
//来自子应用的数据：
const childDataChange = (e: any) => {
    microStoreData.getMicroChildData(e.detail.data);
};
</script>

<style lang="scss" scoped>
.child-micro {
    width: 100%;
    height: 100%;
}
.micro_child_wrapper {
    width: 100%;
    height: 100%;
}
.child-micro3 {
    height: 100vh;
}
</style>