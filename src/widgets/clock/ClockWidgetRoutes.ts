import type { RouteRecordRaw } from 'vue-router'
import ClockWidget from './Clock.widget'

const path = ClockWidget.path
const name = ClockWidget.name

const configPagePath = ClockWidget.configPagePath!

const ClockWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.test.widget.clock" */ './ClockWidgetView.vue'
      ),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () =>
      import(
        /* webpackChunkName: "cn.test.widget.clock.config" */ './ClockConfigView.vue'
      ),
  },
]

export default ClockWidgetRoutes
