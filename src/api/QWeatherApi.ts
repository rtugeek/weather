import { QWeatherAxios, type QWeatherResponse } from '@/api/QWeatherCommon'
import { LANGUAGE_CODE } from '@/utils/LanguageUtils'

export class QWeatherApi {
  /**
   * 实时天气
   * @param location  需要查询地区的LocationID或以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位），LocationID可通过GeoAPI获取。例如 location=101010100 或 location=116.41,39.92
   * @param key
   * @param lang
   * @see https://dev.qweather.com/docs/api/weather/weather-now/
   */
  static async weatherNow(location: string, key: string, lang = LANGUAGE_CODE): Promise<QWeatherNowResponse> {
    // https://weatheroffer.com/api/weather/city?location=118.0673%2C24.4793&lang=en
    const result = await QWeatherAxios.get(`https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}&lang=${lang}`)
    return result as unknown as QWeatherNowResponse
  }

  /**
   * 天气指数预报
   * @param location
   * @param key
   * @param days      只能传1天或者3天
   * @param lang
   * @see https://dev.qweather.com/docs/api/indices/indices-forecast/
   */
  static async indices(location: string, key: string, days: 1 | 3 = 1, lang = LANGUAGE_CODE): Promise<QWeatherIndicesResponse> {
    const result = await QWeatherAxios.get(`https://devapi.qweather.com/v7/indices/${days}d?type=0&location=${location}&key=${key}&lang=${lang}`)
    return result as unknown as QWeatherIndicesResponse
  }

  /**
   * 获取天气3天预报
   * @param location
   * @param key
   * @param lang
   * @see   https://dev.qweather.com/docs/api/weather/weather-daily-forecast/
   */
  static async weather3d(location: string, key: string, lang = LANGUAGE_CODE): Promise<QWeatherDailyResponse> {
    const result = await QWeatherAxios.get(`https://devapi.qweather.com/v7/weather/3d?location=${location}&key=${key}&lang=${lang}`)
    return result as unknown as QWeatherDailyResponse
  }

  /**
   * 空气质量5天预报
   * @param location
   * @param key
   * @param lang
   * @see https://dev.qweather.com/docs/api/air/air-daily-forecast/
   */
  static async air5d(location: string, key: string, lang = LANGUAGE_CODE): Promise<QWeatherAir5dResponse> {
    const result = await QWeatherAxios.get(`https://devapi.qweather.com/v7/air/5d?location=${location}&key=${key}&lang=${lang}`)
    return result as unknown as QWeatherAir5dResponse
  }
}

export interface NowWeather {
  obsTime: string
  temp: string
  feelsLike: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  dew: string
}

export interface QWeatherNowResponse extends QWeatherResponse {
  now: NowWeather
}

export interface DailyIndex {
  date: string
  type: string
  name: string
  level: string
  category: string
  text: string
}

interface QWeatherIndicesResponse extends QWeatherResponse {
  daily: DailyIndex[]
}

export interface Air5d {
  fxDate: string
  aqi: string
  level: string
  category: string
  primary: string
}

export interface QWeatherAir5dResponse extends QWeatherResponse {
  daily: Air5d[]
}

interface DailyWeather {
  fxDate: string
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moonPhase: string
  moonPhaseIcon: string
  tempMax: string
  tempMin: string
  iconDay: string
  textDay: string
  iconNight: string
  textNight: string
  wind360Day: string
  windDirDay: string
  windScaleDay: string
  windSpeedDay: string
  wind360Night: string
  windDirNight: string
  windScaleNight: string
  windSpeedNight: string
  humidity: string
  precip: string
  pressure: string
  vis: string
  cloud: string
  uvIndex: string
}

export interface QWeatherDailyResponse extends QWeatherResponse {
  daily: DailyWeather[]
}
