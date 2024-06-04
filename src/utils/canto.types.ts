export interface CantoItem {
  height: string
  ownerName: string
  dpi: string
  idPath: string
  namePath: string
  created: string
  url: {
    preview?: string
    detail: string
  }
  time: string
  width: string
  name: string
  id: string
  size: string
  scheme: string
  owner: string
  children?: CantoItem[]
}

export interface TreeNodeProps {
  items: CantoItem[]
}
