import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, MoreHorizontal } from 'lucide-react'
import '../app/dropdown.css'

const ServiceRequestDropdownMenu = () => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState('pedro')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className='IconButton' aria-label='Customize options'>
          <MoreHorizontal />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='DropdownMenuContent' sideOffset={0}>
          <DropdownMenu.Item className='DropdownMenuItem'>Close</DropdownMenu.Item>
          <DropdownMenu.Item className='DropdownMenuItem' disabled>
            Reopen
          </DropdownMenu.Item>
          <DropdownMenu.Item className='DropdownMenuItem'>Log Time</DropdownMenu.Item>
          <DropdownMenu.Item className='DropdownMenuItem'>Change Service Type</DropdownMenu.Item>
          <DropdownMenu.Label className='DropdownMenuLabel'>Technicians</DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.CheckboxItem className='DropdownMenuCheckboxItem'>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <Check />
              </DropdownMenu.ItemIndicator>
              Derek Williams
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem className='DropdownMenuCheckboxItem'>
              <DropdownMenu.ItemIndicator className='DropdownMenuItemIndicator'>
                <Check />
              </DropdownMenu.ItemIndicator>
              Mark Tiahrt
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.Arrow className='DropdownMenuArrow' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default ServiceRequestDropdownMenu
