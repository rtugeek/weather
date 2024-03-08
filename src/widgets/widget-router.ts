import type { RouteRecordRaw } from 'vue-router'
import ClockWidgetRoutes from './clock/ClockWidgetRoutes'
import WeatherWidgetRoutes from '@/widgets/weather/WeatherWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...ClockWidgetRoutes,
  ...WeatherWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
