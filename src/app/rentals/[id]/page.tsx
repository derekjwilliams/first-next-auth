'use server'
import { createClient } from '../../../lib/supabase/client'
import Image from 'next/image'
import { getPlaceholderImage } from '../../../utils/images'
import * as stylex from '@stylexjs/stylex'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { borders } from '@derekjwilliams/stylextras-open-props-pr/borders.stylex'
import { fonts } from '@derekjwilliams/stylextras-open-props-pr/fonts.stylex'
import { marigoldColors } from '../../../app/customStyles/marigoldColors.stylex'
import { spacingPatterns } from '../../../app/customStyles/spacingPatterns.stylex'

const imageSize = 240
const aspectRatio = 1.6 // puts width at 384px

const rental = stylex.create({
  propertyInformation: {
    display: 'grid',
    gridTemplateColumns: '[a0] 1fr [a1] 4fr [a2] 1fr [b2] 3fr [a3] 2fr [b3] 2fr [a4] 3fr [b4] 1fr [a5] 4fr [a6]',
    gridColumnGap: sizes.fluid1,
    gridRowGap: sizes.fluid2,
    margin: spacingPatterns.gapMedium,
    padding: spacingPatterns.gapMedium,
    backgroundColor: marigoldColors.background,
    color: marigoldColors.foreground,
  },
  mediaScroller: {
    display: 'grid',
    gap: [0, spacingPatterns.gapMedium, spacingPatterns.gapMedium].join(' '),
    padding: spacingPatterns.gapMedium,
    gridAutoFlow: 'column',
    gridAutoColumns: {
      default: '22%',
      '@media (max-width: 768px)': '70%',
      '@media (max-width: 1400px)': '30%',
    },
    overflowX: 'auto',
    backgroundColor: marigoldColors.background,
    overscrollBehavior: 'contain',
  },
  mediaElement: {
    display: 'grid',
    gridTemplateRows: 'min-content',
    margin: [spacingPatterns.gapMedium, spacingPatterns.gapTiny].join(' '),
    borderRadius: borders.radius3,
  },
  image: {
    inlineSize: '100%',
    aspectRatio: 1.5,
    objectFit: 'cover',
    width: '100%',
    height: 'auto',
  },
  details: {
    gridColumn: 'a0 / a3',
  },
  overview: {
    gridColumn: 'a3 / a6',
  },
  description: {
    margin: spacingPatterns.gapMedium,
  },
  legal: {
    margin: spacingPatterns.gapMedium,
    fontSize: fonts.size0,
  },
  rooms: {
    marginBottom: spacingPatterns.gapLarge,
  },
  heading: {
    fontWeight: fonts.weight7,
    marginBottom: spacingPatterns.gapLarge,
  },
  address: {
    marginBottom: spacingPatterns.gapLarge,
    fontWeight: fonts.weight7,
  },
  highlights: {
    marginBottom: spacingPatterns.gapMedium,
  },
  highlightsList: {
    margin: '0',
    marginLeft: spacingPatterns.gapSmall,
    lineHeight: spacingPatterns.gapLarge,
    paddingInlineStart: 0,
    overflowWrap: 'break-word',
  },
})
type Params = Promise<{ id: string }>

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const supabase = createClient()
  const { data: listing } = await supabase
    .from('listings')
    .select(
      'description, features, monthly_rent, rooms, lease_terms, address_1, address_2, city, state_province, postal_code, required_legal_statement, listing_images(id, url, description)',
    )
    .eq('id', id)
    .throwOnError()
    .single()

  const listingImages = listing?.listing_images?.map(async (image) => {
    const blur = await getPlaceholderImage(image.url)
    return (
      <div
        key={image.id}
        {...stylex.props(rental.mediaElement)}>
        <Image
          draggable={false}
          {...stylex.props(rental.image)}
          alt={image.description}
          width={imageSize * aspectRatio}
          height={imageSize}
          src={image.url}
          placeholder='blur'
          blurDataURL={blur.placeholder}
          loading='lazy'></Image>
      </div>
    )
  })

  const overview = (
    <div {...stylex.props(rental.overview)}>
      <h2>Building overview</h2>
      <p {...stylex.props(rental.description)}>{listing?.description}</p>
    </div>
  )

  const details = (
    <div {...stylex.props(rental.details)}>
      <h2 {...stylex.props(rental.heading)}>
        <div {...stylex.props(rental.heading)}>{`$${listing?.monthly_rent.toLocaleString()}/mo`}</div>
      </h2>
      <div {...stylex.props(rental.rooms)}>{listing?.rooms}</div>
      <div {...stylex.props(rental.address)}>
        {`${listing?.address_1}${listing?.address_2 !== null ? ' ' + listing?.address_2 : ''},  ${listing?.city}, ${
          listing?.state_province
        } ${listing?.postal_code}`}
      </div>
      <div {...stylex.props(rental.highlights)}>
        <h3>Highlights</h3>
        <div>
          <ul {...stylex.props(rental.highlightsList)}>
            {listing?.features.map((feature: string, index: string) => <li key={index}>{feature}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div>
        <div {...stylex.props(rental.propertyInformation)}>
          {details}
          {overview}
        </div>
      </div>
      {/* <div {...stylex.props(rental.mediaScroller)}>{tinyListingImages}</div> */}
      <div {...stylex.props(rental.mediaScroller)}>{listingImages}</div>
      <p {...stylex.props(rental.legal)}>{listing?.required_legal_statement}</p>
    </div>
  )
}
