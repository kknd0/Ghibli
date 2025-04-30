import OpenAI from 'openai'
import { writeFile } from 'fs/promises'

const client = new OpenAI()
const prompt =
  'Create a toy of the person in the photo. Let it be an action figure. Next to the figure, there should be the toy’s equipment, each in its individual blisters. 1) a book called “Tecnoforma”. 2) A 3-headed dog with a tag that says “Troika” and a bone at its feet with word “austerity” written on it. 3) a three-headed Hydra with with a tag called “Geringonça”. 4) a book titled “D. Sebastião”. Don’t repeat the equipment under any circumstance. The card holding the blister should be strong orange. Also, on top of the box, write ‘Pedro Passos Coelho’ and underneath it, ‘PSD action figure’. The figure and equipment must all be inside blisters. Visualize this in a realistic way.'

const img = await client.images.generate({
  model: 'gpt-image-1',
  prompt,
  n: 1,
  size: '1024x1024',
})

const imageBuffer = Buffer.from(img.data?.[0].b64_json ?? '', 'base64')
await writeFile('output.png', imageBuffer)
