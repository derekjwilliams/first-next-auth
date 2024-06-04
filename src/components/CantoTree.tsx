'use client'
import { CantoItem, TreeNodeProps } from '@/utils/canto.types'
import { useState } from 'react'

export const CantoTreeNode = ({ node }: { node: CantoItem }) => {
  const [showChildren, setShowChildren] = useState(true)
  return (
    <ul>
      <li>
        <h2 style={{ cursor: 'pointer' }} onClick={() => setShowChildren(!showChildren)}>
          {node.name}
        </h2>
        {showChildren && (
          <ul>
            <li>ID: {node.id}</li>
            <li>ID Path: {node.idPath}</li>
            <li>Name Path: {node.namePath}</li>
            <li>Height: {node.height}</li>
            <li>Owner Name: {node.ownerName}</li>
            <li>DPI: {node.dpi}</li>
            <li>Created: {node.created}</li>
            <li>
              URL Detail: <a href={node.url.detail}>{node.url.detail}</a>
            </li>
            {node.url.preview && (
              <li>
                URL Preview: <a href={node.url.preview}>{node.url.preview}</a>
              </li>
            )}
            <li>Time: {node.time}</li>
            <li>Width: {node.width}</li>
            <li>Size: {node.size}</li>
            <li>Scheme: {node.scheme}</li>
            <li>Owner: {node.owner}</li>
          </ul>
        )}

        {node.children && <ul>{showChildren && <CantoTree items={node.children} />}</ul>}
      </li>
    </ul>
  )
}
export const CantoTree: React.FC<TreeNodeProps> = ({ items }) => {
  return items.map((node, index) => <CantoTreeNode key={index} node={node} />)
}
