import { defineStore } from 'pinia'
const $window: any = window

export const useMicroStore = defineStore({
    id: 'micro', // id必填，且需要唯一
    state: () => {
        return {
        }
    },
    actions: {
        updateMicroData(val: any) {
            $window.eventCenterFor_child_micro.dispatch(val)
        }
    }
})