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
  stream: true, // 不使用 stream，方便获取完整结果
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
  } catch (error: any) {
    console.error('❌ 请求失败:', error.response?.data || error.message)
  }
}

generateAndDownloadImage()
