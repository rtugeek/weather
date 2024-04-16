import axios from 'axios'
import { LANGUAGE_CODE } from '@/utils/LanguageUtils'
import type { QWeatherResponse } from '@/api/QWeatherCommon'

export class GeoApi {
  /**
   * @param location 可以是经纬度，也可以是城市名
   * @param key
   * @param lang
   * @see   https://dev.qweather.com/docs/api/geoapi/city-lookup/
   */
  static async lookup(location: string, key: string, lang = LANGUAGE_CODE): Promise<QWeatherGeoLookupResponse> {
    const result = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}&lang=${lang}`)
    return result.data
  }
}

export interface GeoLocation {
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

interface QWeatherGeoLookupResponse extends QWeatherResponse {
  location: GeoLocation[]
}

export const DEFAULT_LOCATION: GeoLocation = {
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
