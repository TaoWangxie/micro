import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import RouterView from '@/layout/RouterView.vue'
// 布局页面
const layout = () => import('@/layout/layout.vue') // 作业管理
// 2. 定义路由配置
const baseRoute: any = [];

type O = Record<string, any>

const routelist = import.meta.globEager('@/views/**/page.json')
const componentlist = import.meta.globEager('@/views/**/index.vue')


export const routetree = getPageJsonToRouteTree(routelist)
let routeConfig: RouteRecordRaw[] = []
try {
  routeConfig = [
    {
      path: '/layout',
      component: layout,
      name: 'layout',
      children: getRouteConfig(routetree, true)
    }
  ]
} catch (error) {
}
export const routes = routeConfig;

// 组装路由配置
function getRouteConfig(tree: O[], root: boolean): RouteRecordRaw[] {
  return tree.map(route => {
    const r = route.$$route
    const pageConfig = routelist[r];
    const componentPath = r.replace(/page.json/, 'index.vue')
    const path = (() => {
      let path = pageConfig?.path
      if (!path) {
        const mkdir = r.match(/views(\/[^\/]*)\/page.json/)
        path = mkdir && mkdir[1];
      }
      return path || '/default'
    })()
    let rou = {
      path,
      name: route.name,
      component: componentlist[componentPath].default,
      meta: {
        title: pageConfig?.menuTitle || ''
      },
    }
    return route.children?.length ? {
      path: route.path,
      name: route.name,
      component: RouterView,
      children: [
        rou,
        ...getRouteConfig(route.children, false)
      ],
      meta: {
        title: pageConfig?.menuTitle || ''
      }
    } : rou
  })
}
// 组装数组结构
function getPageJsonToRouteTree(map: O) {
  let result: O[] = []

  const queue = Object.keys(map)

  /* 校验是否因为乱序排列，而导致的父路由滞后入栈 */
  let tags = ''

  while (queue.length) {
    const t = queue.shift() as string;

    const module = { ...map[t], children: [], $$route: t } as O

    if (isRootRoute(t)) {
      result.push(module)
    } else {
      const parent = getThisParentMudole(t, result)

      parent ? (
        parent.children.push(module)
      ) : (

        /* 
          * 当第一次找不到路由位置的时刻，添加一次重试的机会，当再次进入这个路由的时候，
          * 表示祖路由已经入栈，但依旧无法找到对应的路由位置，则说明page.json配置信息出，可能出现了跨目录配置
          * 
          * 这里的前提，是高层级的路由一定会优先低层级的路由入栈
        */
        ['END', t].includes(tags) ? (
          result.push(module),
          (tags = 'END')
        ) : (
          queue.push(t),
          !tags && (tags = t)
        )

      )
    }
  }

  return result
}

/* 是否为根路由 */
function isRootRoute(route: string) {
  return /views\/([^\/]*)\/page.json$/.test(route)
}

/* a 属于 b */
function isGrandsonOf(a: any, b: any) {
  const arg = b.split('page.json')[0]
  return a.startsWith(arg)
}

/* a 只属于 b */
function isChildOf(a: any, b: any) {
  const arg = b.split('page.json')
  const reg = new RegExp(`^${arg[0]}([^\/]*)/page.json$`)

  return reg.test(a)
}

/* 查找父module */
function getThisParentMudole(router: string, source: O[]): any {
  if (!source.length) return false

  for (let route of source) {
    if (isGrandsonOf(router, route.$$route) && !isChildOf(router, route.$$route) && route.children?.length) {
      return getThisParentMudole(router, route.children)
    } else if (isGrandsonOf(router, route.$$route) && isChildOf(router, route.$$route)) {
      return route
    }
  }
}

const router = createRouter({
  history: createWebHashHistory('/child-micro/'), // hash模式:createWebHashHistory，history模式:createWebHistory
  routes: [...baseRoute, ...routes]
});

export default router;
