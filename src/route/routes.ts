import {
  HomeOutlined,
  UsergroupAddOutlined,
  ReconciliationOutlined,
  SolutionOutlined
} from '@ant-design/icons'
import Home from '@/pages/home'
import SysHome from '@/pages/sysHome'
import GroupManage from '@/pages/groupManage'
import ClassManage from '@/pages/classManage'

import ReportManage from '@/pages/statistics/reportManage'
import ExceptionManage from '@/pages/statistics/exceptionManage'

/**
 * path 跳转的路径
 * component 对应路径显示的组件
 * exact 匹配规则，true的时候则精确匹配。
 */

// 管理员路由
export const adminRoutes = [
  {
    path: '/',
    name: '考勤概览',
    exact: true,
    key: 'home',
    icon: HomeOutlined,
    permission: '1',
    component: Home
  },
  {
    path: '/groupManage',
    name: '考勤组管理',
    exact: true,
    key: 'groupManage',
    permission: '1',
    component: GroupManage,
    icon: UsergroupAddOutlined
    // icon: () =>
    //   React.createElement(Icon, { icon: 'arcticons:syska-smart-home' })
  },
  {
    path: '/classManage',
    name: '班次管理',
    exact: true,
    key: 'classManage',
    permission: '1',
    component: ClassManage,
    icon: SolutionOutlined
    // icon: () =>
    //   React.createElement(Icon, { icon: 'arcticons:syska-smart-home' })
  },
  {
    path: '/statistics',
    name: '考勤统计',
    key: 'statistics',
    type: 'subMenu',
    permission: '1',
    icon: ReconciliationOutlined,
    routes: [
      {
        path: '/statistics/reportManage',
        name: '报表管理',
        exact: true,
        key: 'reportManage',
        permission: '1',
        component: ReportManage
      },
      {
        path: '/statistics/exceptionManage',
        name: '异常处理',
        exact: true,
        key: 'exceptionManage',
        permission: '1',
        // hideInMenu: true,
        component: ExceptionManage
      }
    ]
  }
]

// 运维人员路由
export const operRoutes = [
  {
    path: '/',
    name: '运维',
    exact: true,
    key: 'home',
    icon: HomeOutlined,
    permission: '2',
    component: SysHome
  }
]
