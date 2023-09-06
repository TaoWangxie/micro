import { createApp } from "vue";
import App from "./App.vue";
import store from '@/store'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useMenusStore } from '@/store/menus';


let app = createApp(App)
// 挂载pinia
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount("#child-micro")

// 在 app.use(store) 后面
const menusStoreData: any = useMenusStore();

// 监听基座下发的数据变化
const $window: any = window
if ($window.eventCenterFor_child_micro) {
  $window.eventCenterFor_child_micro.addGlobalDataListener((globalData: any) => {
    let { from, data } = globalData
    if (from === 'base') {
      console.log('child:', data);
      menusStoreData.updateMenus(data.menus);
      menusStoreData.setActiveIndex(data.defaultPath)
      // 当基座下发跳转指令时进行跳转
      router.push(data.defaultPath)
    }
  }, true)
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
fixBugForVueRouter4(router)
function fixBugForVueRouter4(router: any) {
  // 判断主应用是main-app 主应用是 vue-router4
  if ($window.location.href.includes('/main-app')) {
    /**
     * 重要说明：
     * 1、这里主应用下发的基础路由为：`/main-xxx/app-vite`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vite`，不同项目根据实际情况调整
     *
     * 2、因为vite关闭了沙箱，又是hash路由，我们这里写死realBaseRoute为：/app-vite#
     */
    const realBaseRoute = '/child-micro#'

    router.beforeEach(() => {
      if (typeof $window.history.state?.current === 'string') {
        $window.history.state.current = $window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
      }
    })

    router.afterEach(() => {
      if (typeof $window.history.state === 'object') {
        $window.history.state.current = realBaseRoute + ($window.history.state.current || '')
      }
    })
  }
}

/** ********************监听事件***********************/
$window.addEventListener(`unmount-child-micro`, destroy$windowListen, true)

function destroy$windowListen() {
  console.log(34, '监听卸载事件')
  $window.eventCenterFor_child_micro?.clearGlobalDataListener()
  $window.removeEventListener('unmount-child-micro', destroy$windowListen, true)
}
// 判断是否为微前端环境
if ($window.__MICRO_APP_BASE_APPLICATION__) {
  $window[`micro-app-child-micro`] = { unmount }
  // 注册事件
  console.log('--微应用状态')
} else {
  console.log('--独立应用状态')
  let data = {
    defaultPath: '/demo',
    menus: [
      {
        name: 'demo',
        path: '/demo',
      },
      {
        name: '主页11',
        path: '',
        children: [
          {
            name: 'home',
            path: '/home',
          },
          {
            name: 'aaa',
            path: '/aaa',
          },
        ],
      },
      {
        name: 'test',
        path: '/test',
      },
    ],
  }
  menusStoreData.updateMenus(data.menus);
  menusStoreData.setActiveIndex(data.defaultPath)
}
function unmount() {
  console.log(44, 'umount-----------------')
}
