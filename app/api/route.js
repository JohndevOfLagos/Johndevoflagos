import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Johndevoflagos'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Fetch the font
  const interSemiBold = fetch(
    new URL('../public/fonts/Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  // Fetch the background image
  const backgroundImage = fetch(
    new URL('../public/images/metadataImage/metabg.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: `url('data:image/png;base64,${await backgroundImage.toString('base64')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          fontFamily: 'Inter',
          fontWeight: 400,
        }}
      >
        About Johndevoflagos
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
