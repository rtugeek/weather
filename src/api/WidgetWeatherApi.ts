import axios from 'axios'
import { LANGUAGE_CODE } from '@/utils/LanguageUtils'

export class WidgetWeatherApi {
  /**
   * @param location 只能是id
   * @param lang
   */
  static async get(location: string, lang = LANGUAGE_CODE): Promise<WidgetWeatherResponse> {
    const result = await axios.get(`https://widget-api.qweather.net/s6/plugin/view?key=68d458440fb9405d80a45973018cf1a2&location=CN${location}&lang=${lang}`)
    return result.data
  }

  static getAQIClass(aqi: number) {
    if (aqi <= 50) {
      return 'city-weather-aqi-1'
    }
    else if (aqi <= 100) {
      return 'city-weather-aqi-2'
    }
    else if (aqi <= 150) {
      return 'city-weather-aqi-3'
    }
    else if (aqi <= 200) {
      return 'city-weather-aqi-4'
    }
    else if (aqi <= 300) {
      return 'city-weather-aqi-5'
    }
    else {
      return 'city-weather-aqi-6'
    }
  }
}

interface AirNowCity {
  aqi: string
  qlty: string
}

interface AirForecast {
  aqi: string
  date: string
  qlty: string
}

interface Now {
  cond_code: string
  cond_txt: string
  tmp: string
}

interface DailyForecast {
  cond_code_d: string
  cond_code_n: string
  cond_txt_d: string
  cond_txt_n: string
  date: string
  mr: string
  ms: string
  sr: string
  ss: string
  tmp_max: string
  tmp_min: string
  wind_dir: string
  wind_dir_d: string
  wind_dir_n: string
}

interface Rain {
  txt: string
}

export interface WidgetWeatherResponse {
  /**
   * @example ok
   * @example unknown location
   */
  status: string
  air_now_city: AirNowCity
  air_forecast: AirForecast[]
  now: Now
  daily_forecast: DailyForecast[]
  rain: Rain
}
