import fs from 'fs'
import OpenAI, { toFile } from 'openai'

const client = new OpenAI()

const imageFiles = ['IMG.jpeg']

const images = await Promise.all(
  imageFiles.map(
    async (file) =>
      await toFile(fs.createReadStream(file), null, {
        type: 'image/jpeg',
      })
  )
)

const rsp = await client.images.edit({
  model: 'gpt-image-1',
  image: images,
  prompt: 'Ghibli style',
})

// Save the image to a file
const image_base64 = rsp.data?.[0].b64_json
const image_bytes = Buffer.from(image_base64 ?? '', 'base64')
fs.writeFileSync('basket.png', image_bytes)
