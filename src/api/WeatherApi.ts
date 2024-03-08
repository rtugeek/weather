import axios from 'axios'
import { LANGUAGE_CODE } from '@/utils/LanguageUtils'

export class WeatherApi {
  /**
   * @param location 可以是经纬度，也可以是城市名
   * @param lang
   */
  static async searchLocation(location: string, lang = LANGUAGE_CODE): Promise<WeatherResponse<WeatherLocationList>> {
    // https://weatheroffer.com/api/weather/city?location=118.0673%2C24.4793&lang=en
    const result = await axios.get(`https://weatheroffer.com/api/weather/city?location=${location}&lang=${lang}`)
    return result.data
  }

  /**
   * @param location 只能是id
   * @param lang
   */
  static async getDaily(location: string, lang = LANGUAGE_CODE): Promise<WeatherResponse<DailyWeatherData>> {
    const result = await axios.get(`https://weatheroffer.com/api/weather/daily?location=${location}&lang=${lang}`)
    return result.data
  }
}

export interface WeatherResponse<T> {
  code: number
  message: string
  timestamp: number
  data: T
}

export interface WeatherLocationList {
  list: WeatherLocation[]
}

export interface WeatherLocation {
  name: string
  id: string
  lat: string
  lon: string
  adm2: string
  adm1: string
  country: string
  tz: string
  utcOffset: string
  isDst: string
  type: string
  rank: string
  fxLink: string
}

export const DEFAULT_LOCATION: WeatherLocation = {
  name: '集美',
  id: '101230206',
  lat: '24.57287',
  lon: '118.10087',
  adm2: '厦门',
  adm1: '福建省',
  country: '中国',
  tz: 'Asia/Shanghai',
  utcOffset: '+08:00',
  isDst: '0',
  type: 'city',
  rank: '35',
  fxLink: 'https://www.qweather.com/weather/jimei-101230206.html',
}

export interface WeatherDataItem {
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

interface DailyWeatherData {
  updateTime: string
  daily: WeatherDataItem[]
  expiredTime: number
}
