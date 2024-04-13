export class StringUtils {
  static getForecastDayText(index: number) {
    if (index == 0) {
      return '今天'
    }
    else if (index == 1) {
      return '明天'
    }
    else {
      return '后天'
    }
  }
}
