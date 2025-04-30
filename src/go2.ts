import fs from 'fs'
import OpenAI from 'openai'

const openai = new OpenAI()

const image = await openai.images.createVariation({
  image: fs.createReadStream('IMG.jpeg'),
})

console.log(image.data)
