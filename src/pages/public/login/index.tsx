import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  LockOutlined,
  UserOutlined,
  ToolOutlined,
  UnlockOutlined
} from '@ant-design/icons'
import { Form, Input, Button, message, Select, Tabs, Spin } from 'antd'
import './login.less'
import Logo from '@/assets/img/logo.png'
import {
  getCompanyList_api,
  login_api,
  sysLogin_api,
  getTenantId_api
} from '@/api/login'
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks'
import { selectUserInfo, setUserInfo } from '@/store/slicers/userSlice'
import { setTabs } from '@/store/slicers/tabSlice'
import { useMount } from 'ahooks'

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(selectUserInfo)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('1')
  const [sysTenantId, setSysTenantId] = useState(null)
  const history = useHistory()

  useMount(async () => {
    const { token } = userInfo
    if (token) {
      history.push('/')
      return
    }
    // 重置 tab栏为首页
    dispatch(setTabs(['/']))
    const res: any = await getCompanyList_api()
    setSysTenantId(await getTenantId_api())
    setOptions(
      res.map((item) => ({
        value: item.tenantId,
        label: item.tenantName
      }))
    )
  })

  // 触发登录方法
  const onLogin = async (params: CommonObjectType<string>) => {
    setLoading(true)
    const { username, password } = params
    let apiFunc
    if (activeKey === '1') {
      // 管理员登录
      apiFunc = login_api(
        {
          username,
          password
        },
        { TenantId: params.company }
      )
    } else {
      // 运维人员登录
      apiFunc = sysLogin_api(
        {
          account: username,
          password
        },
        { TenantId: sysTenantId }
      )
    }
    apiFunc
      .then((res) => {
        message.success(`欢迎您，${res.data.name}`)
        dispatch(
          setUserInfo({
            ...res.data,
            token: res.SESSION_USER,
            permission: activeKey // 1:管理员 2:运维人员
          })
        )
        window.location.href='/'
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const FormView = (
    <div className="login-form">
      <Spin className="form-spin" spinning={loading}>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          centered
          items={[
            {
              label: (
                <span>
                  <ToolOutlined />
                  管理员登录
                </span>
              ),
              key: '1',
              children: (
                <Form name="login-form" onFinish={onLogin}>
                  <Form.Item
                    name="company"
                    validateTrigger="onChange"
                    rules={[{ required: true, message: '请选择公司' }]}
                  >
                    <Select
                      allowClear
                      loading={options.length <= 0}
                      placeholder="公司"
                      options={options}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    validateTrigger="onChange"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input
                      allowClear
                      placeholder="用户名"
                      prefix={<UserOutlined />}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    validateTrigger="onChange"
                    rules={[{ required: true, message: '请输入密码' }]}
                    // extra="说明文字"
                  >
                    <Input.Password
                      placeholder="密码"
                      prefix={<LockOutlined />}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="login-form-button"
                      htmlType="submit"
                      size="large"
                      type="primary"
                    >
                      登录
                    </Button>
                    {/* <OidcLogin loginCallback={() => history.push('/')} /> */}
                  </Form.Item>
                </Form>
              )
            },
            {
              label: (
                <span>
                  <UnlockOutlined />
                  运维人员登录
                </span>
              ),
              key: '2',
              children: (
                <Form
                  className="login-form"
                  name="login-form"
                  onFinish={onLogin}
                >
                  <Form.Item
                    name="username"
                    validateTrigger="onChange"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input
                      allowClear
                      placeholder="用户名"
                      prefix={<UserOutlined />}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    validateTrigger="onChange"
                    rules={[{ required: true, message: '请输入密码' }]}
                    // extra="说明文字"
                  >
                    <Input.Password
                      placeholder="密码"
                      prefix={<LockOutlined />}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="login-form-button"
                      htmlType="submit"
                      size="large"
                      type="primary"
                      loading={!sysTenantId}
                    >
                      登录
                    </Button>
                    {/* <OidcLogin loginCallback={() => history.push('/')} /> */}
                  </Form.Item>
                </Form>
              )
            }
          ]}
        />
      </Spin>
    </div>
  )

  return (
    <div className="login-layout" id="login-layout">
      <div className="logo-box flex">
        <img alt="" className="logo login-logo" src={Logo} />
        <span className="logo-name">E考勤后台管理系统</span>
      </div>
      {FormView}
      <div className="login-footer">
        Copyright @{new Date().getFullYear()} 江西科晨洪兴信息技术有限公司
        技术支持
      </div>
    </div>
  )
}

export default LoginForm
