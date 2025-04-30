import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from 'better-upload/server/helpers'
import fs from 'fs'
const bucketName = 'apsu'

const client = r2({
  accountId: process.env.CF_ACCOUNT_ID!,
  accessKeyId: process.env.CF_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
})
const fileBuffer = fs.readFileSync('images/9.jpeg')
console.log(fileBuffer.length)

const command = new PutObjectCommand({
  Bucket: bucketName,
  Key: 'IMG.jpeg',
  Body: fileBuffer,
  ContentType: 'image/jpeg',
})

const result = await client.send(command)

console.log(result)
