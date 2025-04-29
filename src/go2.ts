import fs from 'fs'
import OpenAI from 'openai'

const openai = new OpenAI()

async function main() {
  const image = await openai.images.createVariation({
    image: fs.createReadStream('otter.png'),
  })

  console.log(image.data)
}
main()
