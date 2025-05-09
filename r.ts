import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from 'better-upload/server/helpers'
const url =
  'https://storage.theapi.app/image/gen-26c1c535-9b8a-4986-af98-0d02f207c456.png'
const r2client = r2({
  accountId: process.env.CF_ACCOUNT_ID!,
  accessKeyId: process.env.CF_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
})

const response = await fetch(url)
const fileBuffer = await response.arrayBuffer()
const name = '4.png'

const command = new PutObjectCommand({
  Bucket: 'apsu',
  Key: name,
  Body: new Uint8Array(fileBuffer),
  ContentType: 'image/png',
})

const result = await r2client.send(command)

console.log(result)
