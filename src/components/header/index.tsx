/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import { store } from '@/store'
import { Dropdown, Layout, Tag, Breadcrumb, Modal } from 'antd'
import { adminRoutes, operRoutes } from '@/route/routes'
import { flattenRoutes } from '@/utils/index'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ToolOutlined,
  UnlockOutlined
} from '@ant-design/icons'
// import Breadcrumb from '@/components/breadcrumb'
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks'
import { selectUserInfo, setUserInfo } from '@/store/slicers/userSlice'
import { setTabs } from '@/store/slicers/tabSlice'
import {
  // selectTheme,
  setCollapsed as setCollapsedGlobal,
  selectCollapsed
  // setMenuMode,
  // setTheme
} from '@/store/slicers/appSlice'

import classNames from 'classnames'
import style from './Header.module.less'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  // const theme = useAppSelector(selectTheme)
  const userInfo = useAppSelector(selectUserInfo)
  const menuMode = useAppSelector((state) => state.app.menuMode)
  const history = useHistory()
  const { name, permission } = userInfo
  // const firstWord = name.slice(0, 1)
  const [collapsed, setCollapsed] = useState(false)
  const global = useAppSelector(selectCollapsed)
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const logout = async () => {
    Modal.confirm({
      title: '确认登出吗？',
      onOk() {
        console.log('登出', userInfo)
        dispatch(setTabs(['/']))
        dispatch(setUserInfo({}))
        // history.replace({ pathname: '/login' })
      }
    })
  }
  const routes =
    store.getState().user.UserInfo.permission === '1' ? adminRoutes : operRoutes
  const flatMenu = flattenRoutes(routes)

  // const changeTheme = (themes: string) => {
  //   dispatch(setTheme(themes))
  // }

  const menu: any = {
    items: [
      {
        key: '1',
        label: (
          <span
            className={style.spanLink}
            style={{ textAlign: 'center' }}
            onClick={logout}
          >
            退出登录
          </span>
        )
      }
    ]
  }
  // <Menu>
  //   <Menu.Item onClick={logout} key="0">
  //     <p className="ant-btn-link" style={{ textAlign: 'center' }}>
  //       退出登录
  //     </p>
  //   </Menu.Item>
  // </Menu>

  // const setting = (
  //   <Menu>
  //     <Menu.Item>
  //       布局
  //       <div>
  //         <div className={style.layoutCheckIndicator}>
  //           <Icon
  //             className="block flex-1 btn ant-btn-link"
  //             icon="tabler:layout-navbar"
  //             rotate={3}
  //             fontSize={36}
  //             color="gray"
  //             onClick={() => dispatch(setMenuMode('vertical'))}
  //           />
  //           <CheckOutlined
  //             className={menuMode === 'vertical' && style.checkboxItem}
  //           />
  //         </div>
  //         <div className={style.layoutCheckIndicator}>
  //           <Icon
  //             className="block flex-1"
  //             icon="tabler:layout-navbar"
  //             fontSize={36}
  //             color="gray"
  //             onClick={() => dispatch(setMenuMode('horizontal'))}
  //           />
  //           <CheckOutlined
  //             className={menuMode === 'horizontal' && style.checkboxItem}
  //           />
  //         </div>
  //       </div>
  //     </Menu.Item>
  //   </Menu>
  // )

  const toggle = (): void => {
    setCollapsed(!collapsed)
    dispatch(setCollapsedGlobal(!collapsed))
  }

  // 更换主题
  useEffect(() => {
    // if (theme === 'default') {
    // 通过挂载 预定义的postcss less.min.js 来处于 挂载预定义的color.less
    // const script = document.createElement('script')
    // script.id = 'themeJs'
    // script.src = '/less.min.js'
    // document.body.appendChild(script)
    // // setTimeout(() => {
    //   const themeStyle = document.getElementById('less:color')
    //   if (themeStyle) localStorage.setItem('themeStyle', themeStyle.innerText)
    // }, 500)
    // } else {
    //   // 深色主题: 移除自定义主题 style 节点和 script.src=themeJs 节点. 深色主题见
    //   const themeJs = document.getElementById('themeJs')
    //   const themeStyle = document.getElementById('less:color')
    //   if (themeJs) themeJs.remove()
    //   if (themeStyle) themeStyle.remove()
    //   localStorage.removeItem('themeStyle')
    // }
    setCollapsed(JSON.parse(JSON.stringify(global)))
  }, [global])

  return (
    <Layout.Header
      className={classNames(style.header, {
        [style.horizontal]: menuMode === 'horizontal'
      })}
    >
      {menuMode === 'vertical' && (
        <>
          <div className={style.toggleMenu} onClick={toggle}>
            {collapsed ? (
              <MenuUnfoldOutlined className={style.trigger} />
            ) : (
              <MenuFoldOutlined className={style.trigger} />
            )}
          </div>
          {/* 面包屑 */}
          {/* <Breadcrumb /> */}
          <Breadcrumb style={{ display: 'inline-block' }}>
            {flatMenu.map((item, key) => {
              if (
                item.key === history.location.pathname.split('/')[1] ||
                history.location.pathname === item.path
              ) {
                return <Breadcrumb.Item key={key}>{item.name}</Breadcrumb.Item>
              }
              return null
            })}
          </Breadcrumb>
        </>
      )}

      {/* 右上角 */}
      <div className={style.rightItems}>
        {permission === '1' ? (
          <Tag icon={<ToolOutlined />} style={{ height: 24 }} color="#3b5999">
            管理员
          </Tag>
        ) : (
          <Tag icon={<UnlockOutlined />} style={{ height: 24 }} color="#3b5999">
            运维人员
          </Tag>
        )}
        <Dropdown
          overlayClassName="content-overlay"
          className={style.content}
          menu={menu}
        >
          <span className={style.user}>
            <span className="avart" />
            <span>{name || '用户名'}</span>
          </span>
        </Dropdown>
      </div>
      {/* <div className={`fr ${style.themeSwitchWrapper}`}>
        <div
          className={`${style.themeSwitch} ${
            theme === 'default' ? '' : style.themeSwitchDark
          }`}
          title="更换主题"
          onClick={() => changeTheme(theme === 'default' ? 'dark' : 'default')}
        >
          <div className={style.themeSwitchInner} />
          <Icon icon="emojione:sun" />
          <Icon icon="bi:moon-stars-fill" color="#ffe62e" />
        </div>
      </div> */}
    </Layout.Header>
  )
}
export default Header
