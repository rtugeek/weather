import * as fs from 'node:fs'
import axios from 'axios'

async function download() {
  for (let i = 100; i <= 515; i++) {
    // 下载图片，并保存到本地
    const fileName = `${i}.png`
    try {
      const response = await axios.get(`https://a.hecdn.net/img/common/icon/202106d/${fileName}`, {
        responseType: 'stream',
      })
      if (response.status === 200) {
        response.data.pipe(fs.createWriteStream(`./public/icon/${fileName}`))
      }
    }
    catch (e) {
      // console.error(e)
    }
  }
}

download()
