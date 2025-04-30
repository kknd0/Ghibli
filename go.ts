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
            url: 'https://images.ctfassets.net/kftzwdyauwt9/21orfxKx8HXXGKH8cTOq60/1eb34535ddce9c9e91fab0fad77bc158/minnias_cat_input.png?w=640&q=90&fm=webp',
          },
        },
        {
          type: 'text',
          text: 'Give this cat a detective hat and a monocle',
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

    // 创建一个buffer来存储完整的响应数据
    let imageData = ''
    let imageUrl = ''

    // 处理SSE流
    response.data.on('data', (chunk: Buffer) => {
      const chunkStr = chunk.toString()
      const lines = chunkStr.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        // 忽略心跳或注释
        if (line.startsWith(':')) continue

        // 处理数据行
        if (line.startsWith('data: ')) {
          const data = line.substring(6)

          // 检查是否是结束标志
          if (data === '[DONE]') {
            console.log('流结束')
            continue
          }

          try {
            const parsedData = JSON.parse(data)

            // 检查是否有图像URL
            if (
              parsedData.choices &&
              parsedData.choices[0]?.message?.content?.[0]?.image_url?.url
            ) {
              imageUrl = parsedData.choices[0].message.content[0].image_url.url
              console.log('获取到图像URL:', imageUrl)
            }

            // 检查是否有内容Delta
            if (
              parsedData.choices &&
              parsedData.choices[0]?.delta?.content?.[0]?.image_url?.url
            ) {
              imageUrl = parsedData.choices[0].delta.content[0].image_url.url
              console.log('获取到图像URL(从delta):', imageUrl)
            }
          } catch (e) {
            console.error('解析SSE数据失败:', e)
          }
        }
      }
    })

    // 流结束时下载图像
    response.data.on('end', async () => {
      if (imageUrl) {
        console.log('开始下载图像...')

        // 下载图像
        const imageResponse = await axios({
          method: 'get',
          url: imageUrl,
          responseType: 'stream',
        })

        // 将图像保存到文件
        const writer = fs.createWriteStream(outputPath)
        imageResponse.data.pipe(writer)

        writer.on('finish', () => {
          console.log('✅ 图片已保存到:', outputPath)
        })

        writer.on('error', (err) => {
          console.error('保存图像时出错:', err)
        })
      } else {
        console.error('没有找到图像URL')
      }
    })

    response.data.on('error', (err: Error) => {
      console.error('流处理错误:', err)
    })
  } catch (error: any) {
    console.error('❌ 请求失败:', error.response?.data || error.message)
  }
}

generateAndDownloadImage()
