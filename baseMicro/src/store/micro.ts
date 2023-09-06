import { defineStore } from 'pinia'
import microApp from '@micro-zoe/micro-app';
import { setSessionStorage, getSessionStorage } from '@/utils/index';
import { childConfigs, menus } from '@/utils/microConfigs';
export const useMicroStore = defineStore({
    id: 'micro', // id必填，且需要唯一
    state: () => {
        return {
            microConfig: getSessionStorage('microConfig') || null, //micro 配置
            microGlobalData: {}, // 全局数据
            microFromChildData: {} // 来自子应用的数据
        }
    },
    actions: {
        //更新base子应用配置
        updateMicroConfig(val: any) {
            this.microConfig = val
            setSessionStorage('microConfig', val)
        },
        //更新全局数据（子应用menus）
        updateMicroGlobalData() {
            this.microGlobalData = {
                menus: menus[this.microConfig.childName],
                defaultPath: menus[this.microConfig.childName][0]?.path
            }
            microApp.setGlobalData({
                from: 'base',
                data: this.microGlobalData
            });
        },
        //获取来自子应用的数据
        getMicroChildData(val: any) {
            console.log('来自子应用的数据：', val);
            this.microFromChildData = val
        }
    }
})