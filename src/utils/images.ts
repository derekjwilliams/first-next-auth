'use server'
import sharp from 'sharp'

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getBuffer(url: string) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

//srcset="/_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&amp;w=96&amp;q=75 1x, /_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&amp;w=256&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&amp;w=256&amp;q=75">
export async function getPlaceholderImage(url: string) {
  try {
    console.log(
      url
      // `http://localhost:3000/_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&w=384&q=75`
    )
    // const originalBuffer = await getBuffer(url)
    const lowResImage = await getBuffer(
      //`http://localhost:3000/_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&w=384&q=75`
      `${process.env.NEXT_URL}_next/image?url=${encodeURIComponent(
        url
      )}&w=384&q=75`
      // https://first-next-auth-eight.vercel.app/_next/image?url=https%3A%2F%2Falysmxvvutkmqugooylp.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fmarigold-rental-images%2F1-web-or-mls-1833%252011th%2520Ave%25201.webp&w=384&q=75
    )
    const resizedBuffer = await sharp(lowResImage).resize(20).toBuffer()
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
export async function getPlaceholderWithImage(filepath: string) {
  try {
    const originalBuffer = await getFileBuffer(filepath)
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer),
    }
  } catch {
    return {
      src: filepath,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
    }
  }
}
