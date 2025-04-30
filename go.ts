import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

const apiKey = process.env.PIAPI_API_KEY

const outputPath = path.resolve(__dirname, 'output.jpg') // 最终图像保存路径

const requestData = {
  model: 'gpt-4o-image',
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image_url',
          image_url: {
            url: 'https://cf.apsubuy.com/IMG.jpeg',
          },
        },
        {
          type: 'text',
          text: 'Make this Ghibli style with a sunglass',
        },
      ],
    },
  ],
  stream: true,
}

async function generateAndDownloadImage() {
  try {
    // 调用生成图片
    const response = await axios.post(
      'https://api.piapi.ai/v1/chat/completions',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: 'stream',
      }
    )
    console.log(response.data)

    console.log('--------------------------------')
    console.log('--------------------------------')
    console.log('--------------------------------')

    let chunks: Buffer[] = []
    let imageUrl: string | null = null

    return new Promise((resolve, reject) => {
      response.data.on('data', (chunk: Buffer) => {
        const chunkStr = chunk.toString()
        chunks.push(chunk)

        // Log each chunk for debugging
        console.log('Received chunk:', chunkStr)

        // Check for image URL in the response
        if (chunkStr.includes('https://storage.theapi.app/image/')) {
          const match = chunkStr.match(
            /https:\/\/storage\.theapi\.app\/image\/[^)"\s]+/
          )
          if (match) {
            imageUrl = match[0]
            console.log('✅ Found image URL:', imageUrl)
          }
        }
      })

      response.data.on('end', async () => {
        if (imageUrl) {
          console.log('✅ Generation completed, image URL:', imageUrl)

          // Download the image
          try {
            const imageResponse = await axios.get(imageUrl, {
              responseType: 'arraybuffer',
            })
            fs.writeFileSync(outputPath, Buffer.from(imageResponse.data))
            console.log(`✅ Image downloaded and saved to ${outputPath}`)
          } catch (error) {
            console.error('❌ Failed to download image:', error)
          }

          resolve(imageUrl)
        } else {
          console.log('❌ No image URL found in the response')
          reject(new Error('No image URL found in the response'))
        }
      })

      response.data.on('error', (error: Error) => {
        console.error('❌ Stream error:', error)
        reject(error)
      })
    })
  } catch (error: any) {
    console.error('❌ 请求失败:', error.response?.data || error.message)
    throw error
  }
}

generateAndDownloadImage()
  .then((url) => {
    console.log('✅ Final image URL:', url)
  })
  .catch((error) => {
    console.error('❌ Failed:', error)
  })
