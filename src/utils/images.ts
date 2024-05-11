'use server'
import sharp from 'sharp'

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getBuffer(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

export async function getPlaceholderImage(url: string) {
  try {
    const lowResImage = await getBuffer(
      `${process.env.NEXT_URL}_next/image?url=${encodeURIComponent(
        url
      )}&w=48&q=25`
    )
    const resizedBuffer = await sharp(lowResImage).resize(10).toBuffer()

    return {
      placeholder: bufferToBase64(resizedBuffer),
    }
  } catch {
    return {
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
    }
  }
}
