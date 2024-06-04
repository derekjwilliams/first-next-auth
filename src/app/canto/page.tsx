import { cantoData } from './cantoData'
import React from 'react'

// Define interfaces for CantoItem and TreeNode
interface CantoItem {
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

interface TreeNodeProps {
  items: CantoItem[]
}

interface TreeNode {
  name: string
  id: string
  children: TreeNode[]
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ items }) => {
  const renderTreeNodes = (data: CantoItem[]) => {
    return data.map((item) => (
      <div key={item.id}>
        <h2>{item.name}</h2>
        <ul>
          <li>ID: {item.id}</li>
          <li>ID Path: {item.idPath}</li>
          <li>Name Path: {item.namePath}</li>
          <li>Height: {item.height}</li>
          <li>Owner Name: {item.ownerName}</li>
          <li>DPI: {item.dpi}</li>
          <li>Created: {item.created}</li>
          <li>
            URL Detail: <a href={item.url.detail}>{item.url.detail}</a>
          </li>
          {item.url.preview && (
            <li>
              URL Preview: <a href={item.url.preview}>{item.url.preview}</a>
            </li>
          )}
          <li>Time: {item.time}</li>
          <li>Width: {item.width}</li>
          <li>Size: {item.size}</li>
          <li>Scheme: {item.scheme}</li>
          <li>Owner: {item.owner}</li>
          {item.children && <li>{renderTreeNodes(item.children)}</li>}
        </ul>
      </div>
    ))
  }

  return <>{renderTreeNodes(items)}</>
}
// Main Tree component to parse JSON and build the tree
const Tree: React.FC = () => {
  const cantoItems: CantoItem[] = cantoData.results
  return (
    <div>
      <h1>Tree Structure</h1>
      <ul>
        <TreeNodeComponent items={cantoItems} />
      </ul>
    </div>
  )
}

export default Tree
