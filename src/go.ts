import OpenAI from 'openai'
import { writeFile } from 'fs/promises'

const client = new OpenAI()

const img = await client.images.generate({
  model: 'gpt-image-1',
  prompt: 'A cute baby sea otter',
  n: 1,
  size: '1024x1024',
})

const imageBuffer = Buffer.from(img.data?.[0].b64_json ?? '', 'base64')
await writeFile('output.png', imageBuffer)
