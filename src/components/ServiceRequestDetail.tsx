'use client'

import useServiceRequestQuery from '../hooks/useServiceRequestQuery'

import * as stylex from '@stylexjs/stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { borders } from '../app/open-props/lib/borders.stylex'

import Link from 'next/link'
import LinkWrapperButton from './controls/LinkWrapperButton'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { theme } from '@/components/lexical/theme'
import { ImageNode } from '@/components/lexical/nodes/ImageNode'
import { RichTextEditor } from '@/components/lexical/RichTextEditor'

const requests = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
  },
  list: {
    margin: sizes.spacing5,
  },
})

const requestCard = stylex.create({
  base: {
    color: marigoldColors.foreground,
    margin: sizes.spacing2,
    display: 'flex',
  },
  h1: {
    fontSize: fonts.sizeFluid3,
    fontWeight: fonts.weight7,
  },
  inset: {
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight2,
    lineHeight: fonts.lineHeight3,
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderColor: marigoldColors.pansy,
    borderRadius: borders.radius2,
    padding: sizes.spacing6,
    backgroundColor: {
      default: 'white',
    },
  },
  details: {
    borderColor: marigoldColors.pansy,
    borderRadius: borders.radius2,
    fontSize: fonts.sizeFluid1,
    fontWeight: fonts.weight2,
    lineHeight: fonts.lineHeight3,
    borderWidth: borders.size1,
    borderStyle: 'solid',
    padding: 0,
    backgroundColor: {
      default: 'white',
    },
    marginTop: sizes.spacing6,
  },
  technicians: {
    marginLeft: sizes.spacing4,
  },
  link: {
    textDecoration: 'none',
    fontSize: fonts.size3,
    color: {
      default: marigoldColors.foregroundLink,
      ':hover': marigoldColors.foregroundHoverLink,
    },
  },
})

const editorConfig = {
  namespace: 'ServiceRequestDetail',
  editable: false, // Read-only editor for viewing content
  theme,
  onError: (error: any) => {
    console.error(error)
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
  ],
}

export default function ServiceRequestDetail({ id }: { id: string | null }) {
  const { data: serviceRequest, isLoading, isError } = useServiceRequestQuery(id!)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !serviceRequest) {
    return (
      <>
        <div>{isError}</div>
        <div>Error</div>
      </>
    )
  }

  return (
    <div {...stylex.props(requests.base)}>
      <LinkWrapperButton href={`/servicerequests/${id}/edit`}>Edit</LinkWrapperButton>

      <div key={serviceRequest.locations?.id} {...stylex.props(requestCard.base)}>
        <h1 {...stylex.props(requestCard.h1)}>{serviceRequest.description}</h1>
      </div>
      <div key={serviceRequest.id} {...stylex.props(requestCard.inset)}>
        <div>{`Location: ${serviceRequest.locations?.street_address} ${
          serviceRequest.locations?.unit_number ? serviceRequest.locations?.unit_number : ''
        }`}</div>
        <div>{`Status: ${serviceRequest.statuses?.status_name}`}</div>
        {/* {serviceRequest.details && <div>{`Details: ${serviceRequest.details}`}</div>} */}
      </div>
      <div {...stylex.props(requestCard.details)}>
        <RichTextEditor
          value={serviceRequest.details}
          onChange={(v) => {}}
          readOnly={true}
          data={serviceRequest.details}
        />
      </div>

      <div>
        {serviceRequest.technicians.length === 0 && (
          <>
            <h2 {...stylex.props(requestCard.base)}>No Technicians Assigned</h2>
          </>
        )}
        {serviceRequest.technicians.length > 0 && (
          <>
            <h2 {...stylex.props(requestCard.base)}>Technicians Assigned</h2>
            <div {...stylex.props(requestCard.technicians)}>
              {serviceRequest.technicians.map((technician: any) => (
                <div key={technician.id}>
                  <Link {...stylex.props(requestCard.link)} href={`/technicians/${technician.id}`}>
                    {technician.name}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
