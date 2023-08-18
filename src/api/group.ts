// import $axios from '@/utils/axios'

// 表格
export function getAttendanceConfByEmp_api(
  params?: object
): Promise<CommonObjectType<any> | string> {
  // return $axios.get('/api/dev-api/group/getAttendanceConfByEmp', params)
  return Promise.resolve({
    page: 1,
    total: 11,
    results: [
      {
        id: 1,
        name: '班次A',
        time: '08:30~12:30'
      },
      {
        id: 2,
        name: '班次B',
        time: '08:30~12:30'
      }
    ]
  })
}

// 删除
export function delete_api(
  params?: object
): Promise<CommonObjectType<any> | string> {
  // return $axios.get('/api/dev-api/group/getAttendanceConfByEmp', params)
  return Promise.resolve('删除成功！')
}

// 新建/编辑
export function update_api(
  params?: object
): Promise<CommonObjectType<any> | string> {
  // return $axios.get('/api/dev-api/group/getAttendanceConfByEmp', params)
  return Promise.resolve('创建成功！')
}
