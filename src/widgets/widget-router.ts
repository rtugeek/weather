import type { RouteRecordRaw } from 'vue-router'
import WeatherWidgetRoutes from '@/widgets/weather/WeatherWidgetRoutes'

// FBI WANING! IMPORT PLACE, DONT DELETE THIS LINE
const WidgetRouter: RouteRecordRaw[] = [
  ...WeatherWidgetRoutes,
  // FBI WANING! ROUTE PLACE, DONT DELETE THIS LINE
]
export default WidgetRouter
