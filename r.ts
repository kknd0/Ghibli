import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2client } from './r2.js'

const url =
  'https://storage.theapi.app/image/gen-26c1c535-9b8a-4986-af98-0d02f207c456.png'

const response = await fetch(url)
const fileBuffer = await response.arrayBuffer()

const command = new PutObjectCommand({
  Bucket: 'apsu',
  Key: '1.png',
  Body: new Uint8Array(fileBuffer),
  ContentType: 'image/png',
})

const result = await r2client.send(command)

console.log(result)
const url1 = `https://cdn.snap2sticker.com/1.png`
