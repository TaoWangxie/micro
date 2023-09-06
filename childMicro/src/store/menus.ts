import { defineStore } from 'pinia'

export const useMenusStore = defineStore({
    id: 'menus', // id必填，且需要唯一
    state: () => {
        return {
            activeIndex: 'demo',
            menus: []
        }
    },
    actions: {
        setActiveIndex(val: any) {
            this.activeIndex = val
        },
        updateMenus(menus: any) {
            this.menus = menus
        }
    }
})