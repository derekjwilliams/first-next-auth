import { createClient } from '../../lib/supabase/client'
import * as stylex from '@stylexjs/stylex'
import Image from 'next/image'
import Link from 'next/link'
import { marigoldColors } from '../customStyles/marigoldColors.stylex'

const rental = stylex.create({
  logo: {
    backgroundColor: 'rgb(255 213 95)',
    padding: '1rem',
  },
  background: {
    backgroundColor: marigoldColors.background,
  },
  link: {
    textDecoration: 'none',
    color: marigoldColors.link,
  },
  overview: {
    padding: '1rem',
  },
  address: {
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '500px',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
})

export default async function Page() {
  const supabase = createClient()
  const { data: listings } = await supabase.from('listings').select(`*`)

  const displayListings = listings?.map((listing) => (
    <div {...stylex.props(rental.overview)} key={listing.id}>
      <Link {...stylex.props(rental.link)} href={`/rentals/${listing.id}`}>
        <div>
          <div {...stylex.props(rental.address)}>
            {`${listing?.address_1}${listing?.address_2 !== null ? ' ' + listing?.address_2 : ''},  ${listing?.city}, ${
              listing?.state_province
            } ${listing?.postal_code}`}
          </div>
          <div {...stylex.props(rental.imageContainer)}>
            {/* <img src={listing.cover_image_url}></img> */}
            <Image
              {...stylex.props(rental.image)}
              width={200 * 1.5}
              height={200}
              //fill
              // sizes='100vw'
              alt={listing?.address}
              src={listing.cover_image_url}></Image>
          </div>
        </div>
      </Link>
    </div>
  ))
  return <div {...stylex.props(rental.background)}>{displayListings}</div>
}
