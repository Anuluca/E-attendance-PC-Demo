import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { store } from '@/store'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { Breadcrumb, Button } from 'antd'
import { adminRoutes, operRoutes } from '@/route/routes'

interface Props {
  breadcrumbs: any[]
}

const routes =
  store.getState().user.UserInfo.permission === '1' ? adminRoutes : operRoutes

// 通用面包屑
const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => {
  const history = useHistory()
  return (
    <Breadcrumb style={{ display: 'inline-block' }}>
      {breadcrumbs.map((bc: CommonObjectType, index: number) => {
        return (
          <Breadcrumb.Item key={bc.key}>
            <Button
              disabled={
                (!bc.exact && bc.match.path !== '/') ||
                index === breadcrumbs.length - 1
              }
              onClick={() => {
                history.push(bc.match.path)
              }}
              style={{ padding: '0', cursor: 'default' }}
              type="link"
            >
              {bc.name}
            </Button>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default withBreadcrumbs(routes)(Breadcrumbs)
