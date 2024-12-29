import { updateServiceRequest } from '../lib/actions'
import { Database, Tables } from '../utils/database.types'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { sizes } from '../app/open-props/lib/sizes.stylex'
import { colors } from '../app/open-props/lib/colors.stylex'
import { marigoldColors } from '../app/customStyles/marigoldColors.stylex'
import stylex from '@stylexjs/stylex'
import { fonts } from '../app/open-props/lib/fonts.stylex'
// import { fonts as globalFonts } from '../app/globalTokens.stylex'
import { borders } from '../app/open-props/lib/borders.stylex'
import RadioSet from './controls/RadioSet'
import { Editor } from './LexicalTextEditor/SimpleLexicalEditor'
const request = stylex.create({
  base: {
    padding: sizes.spacing5,
    backgroundColor: marigoldColors.background,
    color: marigoldColors.foreground,
  },
  h1: {
    fontSize: fonts.size4,
  },
  technicians: {
    margin: sizes.spacing00,
  },
  technician: {
    margin: sizes.spacing2,
  },
  requestButton: {
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: fonts.size2,
    borderRadius: borders.radius2,
    placeItems: 'center',
    display: 'grid',
    minWidth: 200,
    padding: sizes.spacing2,
    backgroundColor: {
      default: marigoldColors.backgroundButton,
      ':hover': marigoldColors.flowerYellow,
    },
    color: {
      default: marigoldColors.foregroundButton,
      ':hover': marigoldColors.foregroundButton,
    },
    transitionDuration: '500ms',
    transitionProperty: 'backgroundColor',
    marginTop: '10px',
  },
})
const radioGroup = stylex.create({
  label: {
    fontSize: fonts.size3,
    lineHeight: fonts.lineHeight0,
    paddingLeft: sizes.spacing3,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: sizes.spacing2,
    marginBottom: sizes.spacing5,
  },
})
const select = stylex.create({
  base: {
    display: 'block',
    fontSize: fonts.size1,
    color: marigoldColors.slate,
    lineHeight: fonts.lineHeight2,
    padding: '0.6em 1.4em 0.5em 0.8em',
    maxWidth: '100%',
    boxSizing: 'border-box',
    margin: '0',
    borderWidth: borders.size1,
    borderStyle: 'solid',
    borderRadius: borders.radius2,
    appearance: 'none',
    backgroundImage:
      'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat, repeat',
    backgroundPosition: 'right 0.7em top 50%, 0 0',
    backgroundSize: '0.65em auto, 100%',
  },
})
const checkbox = stylex.create({
  checkboxRoot: {
    backgroundColor: { default: 'white', ':hover': marigoldColors.flowerYellow },
    width: 25,
    height: 25,
    borderRadius: '4px',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray6,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: sizes.spacing2,
  },
  checkboxIndicator: {
    padding: 0,
  },
  checkIcon: {
    color: marigoldColors.slate,
    height: '100%',
    width: '100%',
  },
})
const form = stylex.create({
  textareaWrapper: {
    display: 'flex',
    marginTop: sizes.spacing5,
  },
  textarea: {
    padding: sizes.spacing3,
    width: 'auto',
    flex: '1',
    fontSize: fonts.size3,
    fontFamily: `-apple-system, BlinkMacSystemFont, Arial`,
    backgroundColor: marigoldColors.backgroundTextarea,
    color: marigoldColors.foreground,
  },
})

export default function ServiceRequestEditFormWithLexical() {
  // const updateServiceRequestWithId = updateServiceRequest.bind(null, serviceRequest.id, availableTechnicianIds)
  return (
    <form>
      <div {...stylex.props(request.base)}>
        <Editor serviceRequestId={''} />
        <button type='submit' {...stylex.props(request.requestButton)}>
          Save Changes
        </button>
      </div>
    </form>
  )
}
