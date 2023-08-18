import React, { useRef, FC, useState } from 'react'
import { Button, Input, Popconfirm, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getAttendanceConfByEmp_api, delete_api } from '@/api/group'

import MyTable from '@/components/myTable'
import MySelect from '@/components/mySelect'
import EditModel from './components/editModel'
import { EditItem, SearchParams } from './types'
import './index.less'

const ReportManage: FC = () => {
  const tableRef: RefType = useRef()
  // 查询条件
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: '',
    type: 'all'
  })
  // 编辑表单
  const editItemModel = {
    id: null,
    name: null,
    time: null
  }
  const [editItem, setEditItem] = useState<EditItem | null>(editItemModel)
  const [modelOpen, setModelOpen] = useState<boolean>(false)

  // 添加
  const add = () => {
    setEditItem(editItemModel)
    setModelOpen(true)
  }

  // 编辑
  const edit = (record: EditItem) => {
    setEditItem(record)
    setModelOpen(true)
  }

  // 删除
  const del = async (record: EditItem) => {
    message.success(await delete_api({ id: record.id }))
    tableRef.current.update()
  }

  // 关闭弹窗 isRefresh:是否刷新table
  const onModalClose = (isRefresh: boolean) => {
    setModelOpen(false)
    setEditItem(editItemModel)
    if (isRefresh) {
      tableRef.current.update()
    }
  }

  // // 选择列
  // const onSelectRow = (rowKeys: string[]) => {
  //   console.log('rowKeys: ', rowKeys)
  // }

  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'name',
      slot: (
        <Input
          placeholder="请输入班次名称"
          allowClear
          onChange={(val) => {
            setSearchParams({ ...searchParams, name: val.target.value })
          }}
        />
      ),
      rules: [],
      initialValue: searchParams.name
    },
    {
      key: 'type',
      slot: (
        <MySelect
          data={[
            { name: '全部班次', key: 'all' },
            { name: '我管理的班次', key: 'mine' }
          ]}
          placeholder="全部班次"
          onChange={(val) => {
            new Promise((resolve) => {
              setSearchParams((res) => {
                resolve(res)
                return { ...searchParams, type: val }
              })
            }).then(() => {
              tableRef.current.update()
            })
          }}
          width={200}
        />
      ),
      rules: [],
      initialValue: searchParams.type
    }
  ]

  // 列配置项
  const columns = [
    {
      title: '班次名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '考勤时间',
      dataIndex: 'time'
    },
    {
      title: () => (
        <>
          操作
          {/* <Tooltip placement="top" title={'我是提示'}>
            <QuestionCircleOutlined />
          </Tooltip> */}
        </>
      ),
      dataIndex: 'operations',
      width: 220,
      render: (_, record) => (
        <>
          <>
            <Button
              className="btn"
              type="link"
              onClick={() => edit(record)}
              size="small"
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除这条数据吗？"
              onConfirm={() => del(record)}
            >
              <Button className="btn" type="link" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </>
        </>
      )
    }
  ]
  return (
    <>
      <div className="report-manage-page">
        <Button
          className="fr"
          onClick={add}
          type="primary"
          icon={<PlusOutlined />}
        >
          新增班次
        </Button>
        <MyTable
          apiFun={getAttendanceConfByEmp_api}
          columns={columns}
          ref={tableRef}
          // onSelectRow={onSelectRow}
          searchConfigList={searchConfigList}
          extraProps={{ results: 10 }}
          tableHeight="calc(100vh - 340px)"
        />
        <EditModel
          isOpen={modelOpen}
          onClose={onModalClose}
          editItem={editItem}
        />
      </div>
    </>
  )
}
export default ReportManage
