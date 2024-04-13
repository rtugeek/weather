import type { RouteRecordRaw } from 'vue-router'
import WeatherWidgetRoutes from '@/widgets/weather/WeatherWidgetRoutes'
import WeatherLargeWidgetRoutes from '@/widgets/weather-large/WeatherLargeWidgetRoutes'
import WeatherMediumWidgetRoutes from '@/widgets/weather-medium/WeatherMediumWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...WeatherWidgetRoutes,
  ...WeatherLargeWidgetRoutes,
  ...WeatherMediumWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
