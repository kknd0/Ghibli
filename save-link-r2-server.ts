import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from 'better-upload/server/helpers'
const url =
  'https://storage.theapi.app/image/gen-26c1c535-9b8a-4986-af98-0d02f207c456.png'
const r2client = r2({
  accountId: process.env.CF_ACCOUNT_ID!,
  accessKeyId: process.env.CF_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
})

export const saveLinkToR2Server = async (url: string) => {
  const response = await fetch(url)

  const fileName = url.split('/').pop()

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fileName,
    Body: new Uint8Array(await response.arrayBuffer()),
    ContentType: response.headers.get('Content-Type') ?? undefined,
  })

  const result = await r2client.send(command)

  if (result.VersionId) {
    console.log(`https://cdn.snap2sticker.com/${fileName}`)
    return `https://cdn.snap2sticker.com/${fileName}`
  }
}

// saveLinkToR2Server(url)
