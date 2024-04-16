import axios, { type AxiosError, type AxiosResponse } from 'axios'

export const QWeatherAxios = axios.create({})
QWeatherAxios.interceptors.response.use((response: AxiosResponse<any, any>) => {
  if (response.status == 200) {
    const code = response.data.code
    let msg = '未知错误'
    if (code != 200) {
      if (code == 204) {
        msg = '请求成功，但你查询的地区暂时没有你需要的数据。'
      }
      else if (code == 400) {
        msg = '请求错误，可能包含错误的请求参数或缺少必选的请求参数。'
      }
      else if (code == 401) {
        msg = '认证失败，可能使用了错误的KEY、数字签名错误、KEY的类型错误'
      }
      else if (code == 402) {
        msg = ('超过访问次数或余额不足以支持继续访问服务')
      }
      else if (code == 403) {
        msg = '无访问权限，可能是绑定的PackageName、BundleID、域名IP地址不一致'
      }
      else if (code == 404) {
        msg = ('查询的数据或地区不存在')
      }
      else if (code == 429) {
        msg = '超过限定的QPM（每分钟访问次数）'
      }
      else if (code == 500) {
        msg = '无响应或超时，接口服务异常请联系和风天气'
      }
      return Promise.reject(new QWeatherError(msg, code))
    }
    return Promise.resolve(response.data)
  }
  else {
    return Promise.reject(new QWeatherError('未知错误', '未知错误'))
  }
}, (error: AxiosError) => {
  return Promise.reject(error)
})

export class QWeatherError extends Error {
  code: string
  constructor(message: string, code: string) {
    super(message)
    this.code = code
  }
}

export interface QWeatherResponse {
  /**
   * 200 请求成功
   * 204 请求成功，但你查询的地区暂时没有你需要的数据。
   * 400 请求错误，可能包含错误的请求参数或缺少必选的请求参数。
   * 401 认证失败，可能使用了错误的KEY、数字签名错误、KEY的类型错误（如使用SDK的KEY去访问Web API）。
   * 402 超过访问次数或余额不足以支持继续访问服务，你可以充值、升级访问量或等待访问量重置。
   * 403 无访问权限，可能是绑定的PackageName、BundleID、域名IP地址不一致，或者是需要额外付费的数据。
   * 404 查询的数据或地区不存在。
   * 429 超过限定的QPM（每分钟访问次数），请参考QPM说明
   * 500 无响应或超时，接口服务异常请联系我们
   */
  code: string
  refer: QWeatherRefer
  updateTime: string
  fxLink: string
}

export interface QWeatherRefer {
  sources: string[]
  license: string[]
}
