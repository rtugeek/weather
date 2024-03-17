import type { RouteRecordRaw } from 'vue-router'
import WeatherWidgetRoutes from '@/widgets/weather/WeatherWidgetRoutes'
import WeatherLargeWidgetRoutes from '@/widgets/weather-large/WeatherLargeWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...WeatherWidgetRoutes,
  ...WeatherLargeWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
