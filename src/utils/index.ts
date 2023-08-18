import './axios'
import { adminRoutes, operRoutes } from '@/route/routes'
import { store } from '@/store'
import ErrorPage from '@/pages/public/errorPage'

function getBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      console.log('Error: ', error)
      resolve('')
    }
  })
}

// 获取时间戳
/**
 * @param {string} type
 * @returns {Date}
 */
function getTime(type) {
  if (type === 'timestamp') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  }
  return new Date(new Date().toDateString())
}

// 防抖
function debounce(fn, delay) {
  let timer = null
  return (...arr) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arr)
    }, delay)
  }
}

// 节流
function throttle(cb, delay) {
  let lastTime = 0
  return (...arg) => {
    const now = Date.now()
    if (now > lastTime + delay) {
      lastTime = now
      cb.apply(this, arg)
    }
  }
}

/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 * @param {string} child 需要递归的字段名
 */
function flattenRoutes(arr: CommonObjectType<unknown>[]) {
  return arr.reduce(
    (prev: CommonObjectType<unknown>[], item: CommonObjectType<unknown>) => {
      if (Array.isArray(item.routes)) {
        prev.push(item)
      }
      return prev.concat(
        Array.isArray(item.routes) ? flattenRoutes(item.routes) : item
      )
    },
    []
  )
}

/**
 * 根据路径获取路由的name和key
 * @param {string} path 路由
 */
function getKeyName(path: string = '/403') {
  const truePath = path.split('?')[0]
  const curRoute = flattenRoutes(
    store.getState().user.UserInfo.permission === '1' ? adminRoutes : operRoutes
  ).filter((item: { path: string | string[] }) => item.path.includes(truePath))
  if (!curRoute[0])
    return { title: '暂无权限', tabKey: '403', component: ErrorPage }
  const { name, key, component } = curRoute[0]
  return { title: name, tabKey: key, component }
}

/**
 * 根据权限判断是否有权限
 */
export const isAuthorized = (val: string): boolean => {
  const curRoutes = flattenRoutes(
    store.getState().user.UserInfo.permission === '1' ? adminRoutes : operRoutes
  )
  return curRoutes.find(
    (item) =>
      item.permission === store.getState().user.UserInfo.permission &&
      item.key === val
  )
}

export { getBase64, getTime, debounce, throttle, flattenRoutes, getKeyName }
