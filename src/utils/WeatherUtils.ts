export class WeatherUtils {
  static getBackgroundClass(code: number) {
    // cloudy
    if (this.between(code, 101, 104) || this.between(code, 151, 153)) {
      return 'city-weather-cloudy'
    }
    // rain
    if (this.between(code, 101, 399)) {
      return 'city-weather-rain'
    }
    // snow
    if (this.between(code, 400, 499)) {
      return 'city-weather-snow'
    }
    // mist or fog
    if (this.between(code, 500, 515)) {
      return 'city-weather-haze'
    }
    // else return sunny sky
    return 'city-weather-sun'
  }

  private static between(x: number, min: number, max: number) {
    return x >= min && x <= max
  }
}
