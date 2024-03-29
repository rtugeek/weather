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

  /**
   * @param location 只能是id
   * @param lang
   */
  static async getHourly(location: string, lang = LANGUAGE_CODE): Promise<WeatherResponse<HourlyWeatherData>> {
    const result = await axios.get(`https://weatheroffer.com/api/weather/hourly?location=${location}&lang=${lang}`)
    return result.data
  }

  static getBackgroundColor(code: string) {
    const blueSkyCode = ['100', '101', '102', '103', '150', '151', '152', '153']
    if (blueSkyCode.includes(code)) {
      return 'linear-gradient(225deg, #87CEEB 0%, #1E90FF 100%)'
    }
    // else return grey sky
    return 'linear-gradient(225deg, #B0C4DE 0%, #708090 100%)'
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

export interface DailyWeatherDataItem {
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

export interface HourlyWeatherDataItem {
  fxTime: string
  temp: string
  icon: string
  text: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  humidity: string
  pop: string
  precip: string
  pressure: string
  cloud: string
  dew: string
}

interface DailyWeatherData {
  updateTime: string
  daily: DailyWeatherDataItem[]
  expiredTime: number
}

interface HourlyWeatherData {
  updateTime: string
  hourly: HourlyWeatherDataItem[]
  expiredTime: number
}
