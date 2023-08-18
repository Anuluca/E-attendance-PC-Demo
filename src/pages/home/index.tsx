import React, { FC, useState } from 'react'
import { getStatList_api } from '@/api/stat'
import { useMount } from 'ahooks'
import { Card, Row, Col, Button, Tag } from 'antd'
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  ReconciliationOutlined
} from '@ant-design/icons'
import './index.less'
import { StatItem } from './types'

const Home: FC = () => {
  const [statList, setStatList] = useState<Array<StatItem>>([])

  useMount(async () => {
    getStatList_api().then((res: any) => {
      setStatList(res?.results)
    })
  })

  // 考勤数据
  const StatCom = () => (
    <Col span={24}>
      <Card>
        <h1>考勤数据</h1>
        <Row className="stat-list">
          {statList.map((item, index) => (
            <Col className="stat-item" span={4} key={index}>
              <p>{item.label}</p>
              <b>{item.count}</b>
            </Col>
          ))}
        </Row>
        <div className="describe">数据统计时间：2023-08-15</div>
      </Card>
    </Col>
  )

  // 快捷入口
  const QuickCom = () => (
    <Col span={24} style={{ marginTop: 20 }}>
      <Card>
        <h1>快捷入口</h1>
        <div className="quick-list">
          <Button type="link" icon={<UserAddOutlined />} size="large">
            新增班次
          </Button>
          <Button type="link" icon={<UsergroupAddOutlined />} size="large">
            新增考勤组
          </Button>
          <Button type="link" icon={<PieChartOutlined />} size="large">
            导出统计报表
          </Button>
          <Button type="link" icon={<ReconciliationOutlined />} size="large">
            加班规则
          </Button>
        </div>
      </Card>
    </Col>
  )

  const questionList = [
    {
      type: 1,
      name: '如何导出考勤报表？'
    },
    {
      type: 1,
      name: '如何设置排班制考勤组？'
    },
    {
      type: 1,
      name: '刚使用考勤，如何快速上手？'
    },
    {
      type: 1,
      name: '如何设置加班规则？'
    }
  ]

  // 常见问题
  const CommonCom = () => (
    <Col span={24} style={{ marginTop: 20 }}>
      <Card style={{ height: 'calc(100vh - 590px)', overflow: 'scroll' }}>
        <h1>常见问题</h1>
        <div className="common-list">
          {questionList.map((item, index) => (
            <p className="common-item" key={index}>
              {item.type === 1 && <Tag>常用</Tag>}
              {item.name}
            </p>
          ))}
        </div>
      </Card>
    </Col>
  )

  return (
    <div className="home-page">
      <Row gutter={16}>
        <StatCom />
        <QuickCom />
        <CommonCom />
      </Row>
    </div>
  )
}

export default Home
