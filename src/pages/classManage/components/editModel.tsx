import React, { FC, useEffect, useRef } from 'react'
import { Modal, Form, Input, message, Select } from 'antd'
import { update_api } from '@/api/group'
import '../index.less'
import { Props } from '../types'

const EditModel: FC<Props> = (props: Props) => {
  const { isOpen, editItem, onClose = () => {} } = props
  const formRef: RefType = useRef(null)

  // 提交
  const handleOk = () => {
    formRef.current.validateFields().then(async (formParams) => {
      console.log('提交参数', formParams)
      message.success(await update_api(formParams))
      onClose(true)
    })
    // .catch((error) => {})
  }

  // 取消
  const handleCancel = () => {
    onClose(false)
  }

  useEffect(() => {
    if (isOpen) {
      formRef.current.setFieldsValue({ ...editItem })
    }
  }, [isOpen, editItem])

  return (
    <>
      <Modal
        title={`${editItem && editItem.id ? '编辑' : '新增'}班次`}
        open={isOpen}
        onOk={handleOk}
        okText="提交"
        onCancel={handleCancel}
      >
        <Form ref={formRef} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item
            label="班次名称"
            name="name"
            rules={[{ required: true, message: '请输入班次名称' }]}
          >
            <Input placeholder="请输入班次名称" />
          </Form.Item>

          <Form.Item
            label="打卡时间"
            name="time"
            rules={[{ required: true, message: '请输入打卡时间' }]}
          >
            <Input placeholder="请输入打卡时间" />
          </Form.Item>
          <Form.Item label="非必填" name="type">
            <Select
              placeholder="请选择"
              options={[
                {
                  value: '1',
                  label: '1'
                },
                {
                  value: '2',
                  label: '2'
                }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default EditModel
