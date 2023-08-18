// import $axios from '@/utils/axios'

// 表格
export function getStatList_api(): Promise<CommonObjectType<any> | string> {
  // return $axios.get('/api/dev-api/stat/getStatList_api', params)
  return Promise.resolve({
    results: [
      {
        name: 'pjgs',
        label: '平均工时',
        count: '0'
      },
      {
        name: 'cdrs',
        label: '迟到人数',
        count: '1'
      },
      {
        name: 'ztrs',
        label: '早退人数',
        count: '1'
      },
      {
        name: 'qkrs',
        label: '缺卡人数',
        count: '1'
      },
      {
        name: 'kgrs',
        label: '旷工人数',
        count: '1'
      },
      {
        name: 'wqrs',
        label: '外勤人数',
        count: '0'
      }
    ]
  })
}
