// 查询参数
export interface SearchParams {
  name: string
  type: string
}

// 编辑列
export interface EditItem {
  id: number
  name: string
  time: string
}

// 弹窗传参
export interface Props {
  isOpen: boolean
  editItem?: EditItem
  onClose?: (isRefresh: boolean) => void
}
