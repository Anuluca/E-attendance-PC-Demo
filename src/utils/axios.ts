import Axios from 'axios'
import { message } from 'antd'
import { store } from '@/store'
import { HashRouter } from 'react-router-dom'

interface AxiosConfig {
  baseURL?: any
  timeout: number
  headers: {
    'Content-Type': string
  }
}

const configs: AxiosConfig = {
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  }
}
configs.baseURL = process.env.REACT_APP_API
if (process.env.REACT_APP_ENV === 'production') {
  configs.baseURL = process.env.REACT_APP_BASE_URL
}

const service = Axios.create(configs)

const router: CommonObjectType = new HashRouter({})

// token失效，清除用户信息并返回登录界面
const clearAll = () => {
  store.dispatch({
    type: 'SET_USERINFO',
    payload: {}
  })
  router.history.replace({ pathname: '/login' })
}

// 请求前拦截
service.interceptors.request.use(
  (req: any) => {
    const { token = '' } = store.getState().user.UserInfo || {}
    req.headers.token = token
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 返回后拦截
service.interceptors.response.use(
  (response: any): Promise<any> => {
    // todo 应考虑在全局统一化响应数据格式.如果没有,则应移除这个拦截器
    const { data } = response
    // if (data.results?.length) {
    //   return Promise.resolve({
    //     rows: data.results,
    //     total: data.results.length
    //   })
    // }
    if (data.successful === true) {
      return Promise.resolve(data.resultValue)
    }
    message.warning(data.resultValue)
    return Promise.reject(response)
  },
  (err) => {
    try {
      if (JSON.stringify(err).includes('403')) {
        clearAll()
      }
    } catch (error) {
      clearAll()
    }
    message.destroy()
    message.error('请求失败')
    return Promise.reject(err)
  }
)

// post请求
// @ts-ignore
Axios.post = (url: string, data?: object, config?: object): Promise<any> =>
  service({
    method: 'post',
    url,
    data,
    ...config
  })

// get请求
Axios.get = (url: string, params?: object, config?: object): Promise<any> => {
  return service({
    method: 'get',
    url,
    params,
    ...config
  })
}

export default Axios
