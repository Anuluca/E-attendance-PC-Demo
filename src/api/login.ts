import $axios from '@/utils/axios'

// 获取登录公司列表
export function getCompanyList_api(): Promise<CommonObjectType<string>> {
  return $axios.get('/sysDatasource/getList')
}

// 获取运维人员 tenantId
export function getTenantId_api(
  params?: object
): Promise<CommonObjectType<object>> {
  return $axios.get('/sysDatasource/getTenantId', params)
}

// 管理员登录
export function login_api(
  params?: object,
  headers?: any
): Promise<CommonObjectType<object>> {
  return $axios.post('/login/login', params, { headers })
}

// 运维人员登录
export function sysLogin_api(
  params?: object,
  headers?: any
): Promise<CommonObjectType<object>> {
  return $axios.post('/sysLogin/login', params, { headers })
}
