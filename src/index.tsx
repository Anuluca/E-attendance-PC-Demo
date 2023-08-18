import React from 'react'
import ReactDOM from 'react-dom'

import 'symbol-observable'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from '@/store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import App from './App'
import '@/assets/css/public.less' // 官方全部样式 ,但是可以通过变量控制
import '@/utils'
import './index.css'

moment.locale('zh-cn')

Promise.resolve().then(async () => {
  ReactDOM.render(
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </PersistGate>
    </ReduxProvider>,
    document.getElementById('root')
  )
})
